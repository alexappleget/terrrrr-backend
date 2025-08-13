import { Request, Response } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { IAuthenticatedRequest, IUserUpdates } from "../types/interface";
import { isProduction, JWT_SECRET, prisma } from "../config";

export const signUp = async (request: Request, response: Response) => {
  try {
    const { username, password } = request.body;

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return response.status(400).json({ error: "User already exists" });
    }

    const salt = crypto.randomBytes(32).toString("hex");
    const hashedPassword = crypto
      .createHash("sha256")
      .update(password + salt)
      .digest("hex");

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        salt,
      },
    });

    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, JWT_SECRET);

    response.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return response.status(200).json({ success: true });
  } catch (error: any) {
    return response.status(500).json({ error: error.message });
  }
};

export const signIn = async (request: Request, response: Response) => {
  try {
    const { username, password } = request.body;

    if (!username || !password) {
      return response
        .status(400)
        .json({ error: "Email and password required" });
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return response
        .status(400)
        .json({ error: "Invalid username or password" });
    }

    const hash = crypto
      .createHash("sha256")
      .update(password + user.salt)
      .digest("hex");

    if (hash !== user.password) {
      return response
        .status(400)
        .json({ error: "Invalid username or password" });
    }

    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, JWT_SECRET);

    if (!token) {
      return response.status(400).json({ error: "No token was created." });
    }

    const cookie = response.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    if (!cookie) {
      return response.status(400).json({ error: "No cookie created" });
    }

    return response.status(200).json({ success: true });
  } catch (error) {
    return response.status(500).json({ error });
  }
};

export const signOut = async (
  request: IAuthenticatedRequest,
  response: Response
) => {
  response.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });

  return response.status(200).json({ success: true });
};

export const fetchUserById = async (
  request: IAuthenticatedRequest,
  response: Response
) => {
  try {
    const { id } = request.user!;

    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, username: true },
    });

    return response.status(200).json({ user });
  } catch (error) {
    return response.status(500).json({ error });
  }
};
