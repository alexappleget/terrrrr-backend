import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET;
export const PORT = process.env.PORT || 6842;
export const FRONTEND_URL = process.env.FRONTEND_URL;
export const isProduction = process.env.NODE_ENV === "production";

export const prisma = new PrismaClient();
