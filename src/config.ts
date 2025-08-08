import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in .env");
}

export const JWT_SECRET = process.env.JWT_SECRET;
export const PORT = process.env.PORT;
export const FRONTEND_URL = process.env.FRONTEND_URL;

export const prisma = new PrismaClient();
