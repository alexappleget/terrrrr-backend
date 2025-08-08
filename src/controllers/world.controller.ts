import { Role } from "@prisma/client";
import { IAuthenticatedRequest } from "../types/interface";
import { Response } from "express";
import crypto from "crypto";
import { prisma } from "../config";

export const createWorld = async (
  request: IAuthenticatedRequest,
  response: Response
) => {
  try {
    const { id } = request.user!;
    const { name, description } = request.body;
    const code = crypto.randomBytes(3).toString("hex").toLowerCase();

    const newWorld = await prisma.world.create({
      data: {
        name,
        description,
        joinCode: {
          create: {
            code,
          },
        },
      },
    });

    await prisma.worldMembership.create({
      data: {
        userId: id,
        worldId: newWorld.id,
        role: Role.OWNER,
      },
    });

    const bosses = await prisma.boss.findMany();

    await prisma.worldBossProgress.createMany({
      data: bosses.map((boss) => ({
        worldId: newWorld.id,
        bossId: boss.id,
        killed: false,
      })),
    });

    return response.status(200).json({ worldId: newWorld.id });
  } catch (error) {
    return response.status(500).json({ error });
  }
};

export const joinWorld = async (
  request: IAuthenticatedRequest,
  response: Response
) => {
  try {
    const { id } = request.user!;
    const { code } = request.body;

    const join = await prisma.joinCode.findUnique({
      where: { code },
    });

    if (!join) {
      return response.status(400).json({ error: "Join code not found" });
    }

    const worldId = join.worldId;

    const alreadyJoined = await prisma.worldMembership.findFirst({
      where: {
        userId: id,
        worldId,
      },
    });

    if (alreadyJoined) {
      return response
        .status(400)
        .json({ error: "You are already a member of this world" });
    }

    await prisma.worldMembership.create({
      data: {
        userId: id,
        worldId,
        role: Role.MEMBER,
      },
    });

    return response.status(200).json({ worldId: worldId });
  } catch (error) {
    return response.status(500).json({ error });
  }
};

export const getUserWorlds = async (
  request: IAuthenticatedRequest,
  response: Response
) => {
  try {
    const { id } = request.user!;

    const userWorldMemberships = await prisma.worldMembership.findMany({
      where: {
        userId: id,
      },
      include: {
        world: true,
      },
    });

    return response.status(200).json({ userWorldMemberships });
  } catch (error) {
    return response.status(500).json({ error });
  }
};

export const getWorldMembership = async (
  request: IAuthenticatedRequest,
  response: Response
) => {
  try {
    const { id: worldId } = request.params;
    const { id: userId } = request.user!;

    const membership = await prisma.worldMembership.findUnique({
      where: {
        userId_worldId: {
          userId,
          worldId,
        },
      },
      include: {
        world: true,
      },
    });

    return response.status(200).json({ membership });
  } catch (error) {
    return response.status(500).json({ error });
  }
};

export const getWorldBosses = async (
  request: IAuthenticatedRequest,
  response: Response
) => {
  try {
    const { id } = request.params;

    const worldBosses = await prisma.boss.findMany({
      include: {
        worldProgress: {
          where: {
            worldId: id,
          },
        },
      },
    });

    return response.status(200).json({ bosses: worldBosses });
  } catch (error) {
    return response.status(500).json({ error });
  }
};

export const createNote = async (
  request: IAuthenticatedRequest,
  response: Response
) => {
  try {
    const { id: worldId } = request.params;
    const { id: userId } = request.user!;
    const { title, content } = request.body;

    await prisma.note.create({
      data: {
        title,
        content,
        authorId: userId,
        worldId,
      },
    });

    return response.status(200).json({ success: true });
  } catch (error) {
    return response.status(500).json({ error });
  }
};

export const getWorldNotes = async (
  request: IAuthenticatedRequest,
  response: Response
) => {
  try {
    const { id } = request.params;

    const notes = await prisma.note.findMany({
      where: { worldId: id },
      include: {
        author: {
          select: {
            username: true,
          },
        },
      },
    });

    return response.status(200).json({ notes });
  } catch (error) {
    return response.status(500).json({ error });
  }
};

export const fetchAllMemberships = async (
  request: IAuthenticatedRequest,
  response: Response
) => {
  try {
    const { id } = request.params;

    const members = await prisma.worldMembership.findMany({
      where: { worldId: id },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    const code = await prisma.joinCode.findUnique({
      where: { worldId: id },
    });

    return response.status(200).json({ code, members });
  } catch (error) {
    return response.status(500).json({ error });
  }
};
