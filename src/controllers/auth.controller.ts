import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { isProduction, JWT_SECRET, prisma } from "../config";

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

export const refresh = async (request: Request, response: Response) => {
  try {
    const refreshToken = request.cookies.refreshToken;
    if (!refreshToken) {
      return response.status(400).json({ error: "No refresh token" });
    }

    const user = await prisma.user.findFirst({
      where: { refreshToken },
    });

    if (!user) {
      return response.status(400).json({ error: "Invalid refresh token" });
    }

    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "15min" });
    const newRefreshToken = crypto.randomBytes(64).toString("hex");

    await prisma.user.update({
      where: { id: user.id },
      data: {
        refreshToken: newRefreshToken,
      },
    });

    response.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    response.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return response.status(200).json({ success: true });
  } catch (error) {
    return response.status(500).json({ error });
  }
};
