import { NextFunction, Response } from "express";
import { IAuthenticatedRequest } from "../types/interface";

export const requireRole = (roles: string[] | string) => {
  return (
    request: IAuthenticatedRequest,
    response: Response,
    next: NextFunction
  ) => {
    const userRole =
      request.method === "GET" ? request.query.userRole : request.body.userRole;

    if (!userRole || typeof userRole !== "string") {
      return response
        .status(401)
        .json({ error: "Unauthorized: No role found." });
    }

    if (Array.isArray(roles)) {
      if (!roles.includes(userRole)) {
        return response.status(403).json({ error: "Unauthorized" });
      }
    } else {
      if (userRole !== roles) {
        return response.status(403).json({ error: "Unauthorized" });
      }
    }

    next();
  };
};
