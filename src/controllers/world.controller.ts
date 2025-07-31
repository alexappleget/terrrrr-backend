import { PrismaClient, Role } from "@prisma/client";
import { IAuthenticatedRequest } from "../types/interface";
import { Response } from "express";

const prisma = new PrismaClient();

export const createWorld = async (
  request: IAuthenticatedRequest,
  response: Response
) => {
  try {
    const { id } = request.user!;
    const { name, description, icon } = request.body;

    const newWorld = await prisma.world.create({
      data: {
        name: name,
        description: description,
        icon: icon,
      },
    });

    await prisma.worldMembership.create({
      data: {
        userId: id,
        worldId: newWorld.id,
        role: Role.OWNER,
      },
    });

    return response.status(200);
  } catch (error) {
    return response.status(500).json({ error });
  }
};

export const getWorldById = async (
  request: IAuthenticatedRequest,
  response: Response
) => {
  try {
    const { worldId } = request.body;

    const world = await prisma.world.findUnique({ where: { id: worldId } });

    return response.status(200).json({ world });
  } catch (error) {
    return response.status(500).json({ error });
  }
};
