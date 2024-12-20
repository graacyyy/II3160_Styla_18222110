CREATE TABLE "user_detail" (
	"userId" text NOT NULL,
	"height" integer,
	"weight" integer,
	"bust" integer,
	"waist" integer,
	"hip" integer,
	"shoeSize" integer,
	"colorPreference" text,
	"stylePreference" text,
	"job" text
);
--> statement-breakpoint
ALTER TABLE "box" ALTER COLUMN "id" SET DEFAULT '0193e2c5-46c0-7476-ad70-14449b991776';--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "id" SET DEFAULT '0193e2c5-46bf-747c-a21c-e160c5b3703b';--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "category" text DEFAULT 'top' NOT NULL;--> statement-breakpoint
ALTER TABLE "user_detail" ADD CONSTRAINT "user_detail_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;