import { type User, type InsertUser, type BlogPost, type InsertBlogPost } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostsByContentType(contentType: string): Promise<BlogPost[]>;
  getBlogPostsByStatus(status: string): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private blogPosts: Map<string, BlogPost>;

  constructor() {
    this.users = new Map();
    this.blogPosts = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  async getBlogPostsByContentType(contentType: string): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.contentType === contentType && post.status === 'published')
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  async getBlogPostsByStatus(status: string): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.status === status)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(
      (post) => post.slug === slug,
    );
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const now = new Date();
    const post: BlogPost = {
      id,
      title: insertPost.title,
      slug: insertPost.slug ?? insertPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      excerpt: insertPost.excerpt ?? null,
      content: insertPost.content ?? null,
      category: insertPost.category ?? null,
      contentType: insertPost.contentType || 'News',
      coverImage: insertPost.coverImage ?? null,
      images: insertPost.images ?? null,
      author: insertPost.author ?? 'Pyrax Editorial',
      readTime: insertPost.readTime ?? '5 min read',
      status: insertPost.status || 'draft',
      publishedAt: now,
      updatedAt: now,
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async updateBlogPost(id: string, updates: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const post = this.blogPosts.get(id);
    if (!post) return undefined;

    const updated: BlogPost = {
      ...post,
      ...updates,
      updatedAt: new Date(),
    };
    this.blogPosts.set(id, updated);
    return updated;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    return this.blogPosts.delete(id);
  }
}

export const storage = new MemStorage();
