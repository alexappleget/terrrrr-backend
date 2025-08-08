import { Response } from "express";
import { IAuthenticatedRequest } from "../types/interface";
import { prisma } from "../config";

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
