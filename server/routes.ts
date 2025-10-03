import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import cryptoRoutes from "./crypto";

export async function registerRoutes(app: Express): Promise<Server> {
  // Crypto API proxy routes
  app.use('/api/crypto', cryptoRoutes);

  const httpServer = createServer(app);

  return httpServer;
}
