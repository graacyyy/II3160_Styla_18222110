import { Hono } from "hono";
import { handle } from "hono/vercel";
import { auth } from "@/utils/auth";
import { cors } from "hono/cors";
import { db } from "@/db";
import { box, boxProduct, product, user, userDetail } from "@/db/schema";
import { eq } from "drizzle-orm";

export const runtime = "edge";

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>().basePath("/api");

app.get("/health", (c) => {
  return c.json({ message: "Server ok!" });
});

app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});

app.use(
  "/auth/**", // or replace with "*" to enable cors for all routes
  cors({
    origin: "http://localhost:3000", // replace with your origin
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

app.on(["POST", "GET"], "/auth/**", (c) => {
  return auth.handler(c.req.raw);
});

app.get("/session", async (c) => {
  const session = c.get("session");
  const user = c.get("user");

  if (!user)
    return c.json(
      {
        message: "Unauthorized",
      },
      401
    );

  return c.json({
    session,
    user,
  });
});

app.get("/product", async (c) => {
  const products = await db.select().from(product);

  return c.json(products);
});

app.get("/product/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const [data] = await db.select().from(product).where(eq(product.id, id));
    if (!data) return c.json({ message: "Product not found" }, 404);

    return c.json(data);
  } catch (e) {
    console.error(e);
    return c.json({ message: e }, 500);
  }
});

app.get("/box", async (c) => {
  const user = c.get("user");

  if (!user) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  let boxes;
  if (user.role !== "admin") {
    boxes = await db
      .select()
      .from(box)
      .innerJoin(boxProduct, eq(box.id, boxProduct.boxId))
      .innerJoin(product, eq(boxProduct.productId, product.id))
      .where(eq(box.customerId, user.id));
  } else {
    boxes = await db
      .select()
      .from(box)
      .innerJoin(boxProduct, eq(box.id, boxProduct.boxId))
      .innerJoin(product, eq(boxProduct.productId, product.id));
  }

  return c.json(boxes);
});

app.post("/box", async (c) => {
  const data: {
    customerId: string;
    productIds: string[];
  } = await c.req.json();

  // const user = c.get("user");

  // if (!user) {
  // 	return c.json({ message: "Unauthorized" }, 401);
  // }

  // if (user.role !== "admin") {
  // 	return c.json({ message: "Unauthorized" }, 401);
  // }

  const [id] = await db
    .insert(box)
    .values({
      id: `FB${Date.now()}`,
      customerId: data.customerId,
    })
    .returning();

  for (const productId of data.productIds) {
    await db.insert(boxProduct).values({
      boxId: id.id,
      productId,
    });
  }

  return c.json({ message: "Box created" });
});

app.get("/customer", async (c) => {
  const customers = await await db
    .select()
    .from(user)
    .innerJoin(userDetail, eq(user.id, userDetail.userId))
    .where(eq(user.role, "user"));

  return c.json(customers);
});

app.get("/check-info", async (c) => {
  const user = c.get("user");

  if (!user) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  const [data] = await db
    .select()
    .from(userDetail)
    .where(eq(userDetail.userId, user.id));

  if (!data) {
    return c.json({ message: "User are not completed yet" }, 404);
  }

  return c.json(data);
});

app.post("/customerDetail", async (c) => {
  const user = c.get("user");

  if (!user) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  const data: {
    age: number;
    job: string;
    height: number;
    weight: number;
    bust: number;
    waist: number;
    hip: number;
    shoeSize: number;
    color: string;
    style: string;
  } = await c.req.json();

  await db.insert(userDetail).values({
    userId: user.id,
    age: data.age,
    job: data.job,
    height: data.height,
    weight: data.weight,
    bust: data.bust,
    waist: data.waist,
    hip: data.hip,
    shoeSize: data.shoeSize,
    colorPreference: data.color,
    stylePreference: data.style,
  });

  return c.json({ message: "User detail added" });
});

app.get("/box/newest", async (c) => {
  const user = c.get("user");

  if (!user) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  const [boxId] = await db
    .select()
    .from(box)
    .where(eq(box.customerId, user.id))
    .limit(1);

  if (!boxId) {
    return c.json({ data: [] });
  }

  const data = await db
    .select()
    .from(boxProduct)
    .innerJoin(product, eq(boxProduct.productId, product.id))
    .where(eq(boxProduct.boxId, boxId.id));

  return c.json({
    data,
  });
});

export const GET = handle(app);
export const POST = handle(app);
export const OPTIONS = handle(app);
