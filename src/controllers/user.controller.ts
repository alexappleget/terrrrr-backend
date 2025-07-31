import { Request, Response } from "express";
import crypto from "crypto";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { IAuthenticatedRequest, IUserUpdates } from "../types/interface";

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET!;

export const signup = async (request: Request, response: Response) => {
  try {
    const { username, password } = request.body;

    const existingUser = await prisma.user.findUnique({
      where: { username: username },
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
        username: username,
        password: hashedPassword,
        salt: salt,
      },
    });

    const payload = {
      id: user.id,
    };

    const authToken = jwt.sign(payload, JWT_SECRET);

    return response.status(200).json({ authToken });
  } catch (error) {
    return response.status(500).json({ error });
  }
};

export const login = async (request: Request, response: Response) => {
  try {
    const { username, password } = request.body;

    if (!username || !password) {
      return response
        .status(400)
        .json({ error: "Email and password required" });
    }

    const user = await prisma.user.findUnique({
      where: { username: username },
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

    const authToken = jwt.sign(payload, JWT_SECRET);

    return response.status(200).json({ authToken });
  } catch (error) {
    return response.status(500).json({ error });
  }
};

export const fetchUserById = async (
  request: IAuthenticatedRequest,
  response: Response
) => {
  try {
    const { id } = request.user!;

    const user = await prisma.user.findUnique({ where: { id: id } });

    return response.status(200).json({ user });
  } catch (error) {
    return response.status(500).json({ error });
  }
};

export const fetchAllUsers = async (
  request: IAuthenticatedRequest,
  response: Response
) => {
  try {
    const allUsers = await prisma.user.findMany();

    return response.status(200).json({ allUsers });
  } catch (error) {
    return response.status(500).json({ error });
  }
};

export const updateUser = async (
  request: IAuthenticatedRequest,
  response: Response
) => {
  try {
    const { id } = request.user!;
    const { username, password } = request.body;

    const updates: IUserUpdates = {};

    if (username) {
      updates.username = username;
    }

    if (password) {
      const salt = crypto.randomBytes(32).toString("hex");
      updates.salt = salt;
      updates.password = crypto
        .createHash("sha256")
        .update(password + salt)
        .digest("hex");
    }

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: updates,
    });

    return response.status(200).json({ updatedUser });
  } catch (error) {
    return response.status(500).json({ error });
  }
};

export const deleteUser = async (
  request: IAuthenticatedRequest,
  response: Response
) => {
  try {
    const { id } = request.user!;

    await prisma.user.delete({ where: { id: id } });

    return response.status(200);
  } catch (error) {
    return response.status(500).json({ error });
  }
};
