import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IAuthenticatedRequest, IAuthPayload } from "../types/interface";

const JWT_SECRET = process.env.JWT_SECRET!;

export const requireAuth = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization;
  const authToken = authHeader && authHeader.split(" ")[1];

  if (!authToken) {
    return response.status(400).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(authToken, JWT_SECRET) as IAuthPayload;
    (request as IAuthenticatedRequest).user = decoded;
    next();
  } catch (error) {
    return response.status(500).json({ error });
  }
};
