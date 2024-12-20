import {
	pgTable,
	text,
	integer,
	timestamp,
	boolean,
	primaryKey,
	serial,
} from "drizzle-orm/pg-core";
import { v7 as uuidv7 } from "uuid";

export const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("emailVerified").notNull(),
	image: text("image"),
	createdAt: timestamp("createdAt").notNull(),
	updatedAt: timestamp("updatedAt").notNull(),
	role: text("role"),
	banned: boolean("banned"),
	banReason: text("banReason"),
	banExpires: timestamp("banExpires"),
});

export const session = pgTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp("expiresAt").notNull(),
	token: text("token").notNull().unique(),
	createdAt: timestamp("createdAt").notNull(),
	updatedAt: timestamp("updatedAt").notNull(),
	ipAddress: text("ipAddress"),
	userAgent: text("userAgent"),
	userId: text("userId")
		.notNull()
		.references(() => user.id),
	impersonatedBy: text("impersonatedBy"),
});

export const account = pgTable("account", {
	id: text("id").primaryKey(),
	accountId: text("accountId").notNull(),
	providerId: text("providerId").notNull(),
	userId: text("userId")
		.notNull()
		.references(() => user.id),
	accessToken: text("accessToken"),
	refreshToken: text("refreshToken"),
	idToken: text("idToken"),
	accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
	refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
	scope: text("scope"),
	password: text("password"),
	createdAt: timestamp("createdAt").notNull(),
	updatedAt: timestamp("updatedAt").notNull(),
});

export const verification = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expiresAt").notNull(),
	createdAt: timestamp("createdAt"),
	updatedAt: timestamp("updatedAt"),
});

export const product = pgTable("product", {
	id: text("id").primaryKey().default(uuidv7()),
	name: text("name").notNull(),
	brandName: text("brandName").notNull(),
	price: integer("price").notNull(),
	category: text("category").notNull().default("top"),
	image: text("image"),
});

export const box = pgTable("box", {
	id: text("id").primaryKey().default(uuidv7()),
	customerId: text("customerId")
		.notNull()
		.references(() => user.id),
	createdAt: timestamp("createdAt").notNull().defaultNow(),
	updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const boxProduct = pgTable(
	"box_product",
	{
		boxId: text("boxId")
			.notNull()
			.references(() => box.id),
		productId: text("productId")
			.notNull()
			.references(() => product.id),
	},
	(table) => ({
		primaryKey: [table.boxId, table.productId],
	}),
);

export const userDetail = pgTable("user_detail", {
	userId: text("userId")
		.notNull()
		.references(() => user.id),
	height: integer("height"),
	age: integer("age"),
	weight: integer("weight"),
	bust: integer("bust"),
	waist: integer("waist"),
	hip: integer("hip"),
	shoeSize: integer("shoeSize"),
	colorPreference: text("colorPreference"),
	stylePreference: text("stylePreference"),
	job: text("job"),
});
