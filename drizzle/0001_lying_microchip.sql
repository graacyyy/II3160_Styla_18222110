CREATE TABLE "box" (
	"id" text PRIMARY KEY DEFAULT '0193e1bf-7277-7524-8912-b9fbfded7b76' NOT NULL,
	"customerId" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "box_product" (
	"boxId" text NOT NULL,
	"productId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product" (
	"id" text PRIMARY KEY DEFAULT '0193e1bf-7277-7524-8912-b4f1cf167e18' NOT NULL,
	"name" text NOT NULL,
	"brandName" text NOT NULL,
	"price" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "box" ADD CONSTRAINT "box_customerId_user_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "box_product" ADD CONSTRAINT "box_product_boxId_box_id_fk" FOREIGN KEY ("boxId") REFERENCES "public"."box"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "box_product" ADD CONSTRAINT "box_product_productId_product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;