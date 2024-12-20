import { drizzle } from "drizzle-orm/neon-http";

export const db = drizzle(process.env.DATABASE_URL!);

(async () => {
	try {
		await db.execute("SELECT 1");
		console.log("Database connection successful");
	} catch (error) {
		console.error("Database connection failed:", error);
		process.exit(1);
	}
})();
