CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"category" text NOT NULL,
	"subcategory" text,
	"brand" text NOT NULL,
	"model" text,
	"oem_part_number" text,
	"description" text NOT NULL,
	"condition" text DEFAULT 'New' NOT NULL,
	"availability" text DEFAULT 'In Stock' NOT NULL,
	"image_url" text NOT NULL,
	"specs" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "products_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rfq_submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"service_type" text NOT NULL,
	"equipment_category" text NOT NULL,
	"project_details" text,
	"duration" text,
	"part_numbers" text,
	"contact_name" text NOT NULL,
	"company" text,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"file_name" text,
	"file_path" text,
	"status" text DEFAULT 'new' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "rfq_submissions" ADD COLUMN IF NOT EXISTS "file_path" text;
