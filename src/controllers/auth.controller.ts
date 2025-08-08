import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const session = async (request: Request, response: Response) => {
  try {
    const token = request.cookies.token;

    if (!token) {
      return response
        .status(400)
        .json({ authenticated: false, error: "No token" });
    }

    jwt.verify(token, JWT_SECRET, (error: jwt.VerifyErrors | null) => {
      if (error) {
        return response
          .status(400)
          .json({ authenticated: false, error: "Invalid token" });
      }

      return response.status(200).json({ authenticated: true });
    });
  } catch (error) {
    return response.status(500).json({ authenticated: false, error });
  }
};
