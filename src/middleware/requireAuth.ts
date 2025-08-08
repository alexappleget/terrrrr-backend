import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IAuthenticatedRequest, IAuthPayload } from "../types/interface";
import { JWT_SECRET } from "../config";

export const requireAuth = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.cookies.token;

  if (!token) {
    return response.status(400).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as IAuthPayload;
    (request as IAuthenticatedRequest).user = decoded;
    next();
  } catch (error) {
    return response.status(500).json({ error });
  }
};
