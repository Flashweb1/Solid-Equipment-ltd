import {
  boolean,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export type ProductSpec = { label: string; value: string };

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  subcategory: text("subcategory"),
  brand: text("brand").notNull(),
  model: text("model"),
  oemPartNumber: text("oem_part_number"),
  description: text("description").notNull(),
  condition: text("condition").notNull().default("New"),
  availability: text("availability").notNull().default("In Stock"),
  imageUrl: text("image_url").notNull(),
  specs: jsonb("specs").$type<ProductSpec[]>().notNull().default([]),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const rfqSubmissions = pgTable("rfq_submissions", {
  id: serial("id").primaryKey(),
  serviceType: text("service_type").notNull(),
  equipmentCategory: text("equipment_category").notNull(),
  projectDetails: text("project_details"),
  duration: text("duration"),
  partNumbers: text("part_numbers"),
  contactName: text("contact_name").notNull(),
  company: text("company"),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  fileName: text("file_name"),
  filePath: text("file_path"),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Product = typeof products.$inferSelect;
export type RfqSubmission = typeof rfqSubmissions.$inferSelect;
