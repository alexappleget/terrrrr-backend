import { Response } from "express";
import { prisma } from "../config";
import { IAuthenticatedRequest } from "../types/interface";

export const getAllMemberships = async (
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
