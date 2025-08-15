import { Response } from "express";
import { IAuthenticatedRequest } from "../types/interface";
import { prisma } from "../config";

export const getWorldBosses = async (
  request: IAuthenticatedRequest,
  response: Response
) => {
  try {
    const { id } = request.params;

    const worldBossesRaw = await prisma.boss.findMany({
      include: {
        worldProgress: {
          where: {
            worldId: id,
          },
          take: 1,
        },
      },
    });

    const worldBosses = worldBossesRaw.map((boss) => ({
      ...boss,
      worldProgress: boss.worldProgress[0],
    }));

    return response.status(200).json({ bosses: worldBosses });
  } catch (error) {
    return response.status(500).json({ error });
  }
};

export const setBossKilledState = async (
  request: IAuthenticatedRequest,
  response: Response
) => {
  try {
    const { id } = request.params;
    const { killed } = request.body;

    await prisma.worldBossProgress.update({
      where: { id },
      data: {
        killed,
      },
    });

    return response.status(200).json({ success: true });
  } catch (error) {
    return response.status(500).json({ error });
  }
};
