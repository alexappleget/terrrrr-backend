import { PrismaClient } from "@prisma/client";
import { IAuthenticatedRequest } from "../types/interface";
import { Response } from "express";

const prisma = new PrismaClient();

export const createWorld = async (
  request: IAuthenticatedRequest,
  response: Response
) => {
  try {
    const { id } = request.user!;
    const { name } = request.body;

    await prisma.world.create({
      data: {
        name: name,
      },
    });
  } catch (error) {
    return response.status(500).json({ error });
  }
};

export const fetchUserWorlds = async (
  request: IAuthenticatedRequest,
  response: Response
) => {
  try {
    const { id } = request.user!;

    const userWorlds = await prisma.world.findMany({
      where: {
        OR: [{ ownerId: id }, { members: { some: { userId: id } } }],
      },
    });

    return response.status(200).json({ userWorlds });
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

export const updateWorld = async (
  request: IAuthenticatedRequest,
  response: Response
) => {};

export const deleteWorld = async (
  request: IAuthenticatedRequest,
  response: Response
) => {};
