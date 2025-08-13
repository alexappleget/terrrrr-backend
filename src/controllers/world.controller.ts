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

    if (!id) {
      return response.status(400).json({ message: "UserId not provided" });
    }

    const userWorldMemberships = await prisma.worldMembership.findMany({
      where: {
        userId: id,
      },
      include: {
        world: {
          include: {
            _count: {
              select: { memberships: true },
            },
          },
        },
      },
    });

    return response.status(200).json({ userWorldMemberships });
  } catch (error) {
    return response.status(500).json({ error });
  }
};

export const getAdminData = async (
  request: IAuthenticatedRequest,
  response: Response
) => {
  try {
    const { id } = request.params;

    const adminData = await prisma.world.findUnique({
      where: { id },
      include: {
        joinCode: true,
        memberships: true,
        bosses: true,
        notes: true,
        events: true,
      },
    });

    return response.status(200).json({ adminData });
  } catch (error) {
    return response.status(500).json({ error });
  }
};
