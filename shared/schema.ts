import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const contentTypeEnum = z.enum(['News', 'Learn', 'Analysis', 'Regulation']);
export type ContentType = z.infer<typeof contentTypeEnum>;

export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  notionPageId: text("notion_page_id").unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  content: text("content"),
  category: text("category"),
  contentType: text("content_type").notNull().default('News'),
  coverImage: text("cover_image"),
  author: text("author").notNull().default('Pyrax Editorial'),
  readTime: text("read_time").default('5 min read'),
  publishedAt: timestamp("published_at").notNull().defaultNow(),
  lastSyncedAt: timestamp("last_synced_at").notNull().defaultNow(),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
}).extend({
  contentType: contentTypeEnum.default('News'),
});

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
