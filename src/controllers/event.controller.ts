import { Response } from "express";
import { IAuthenticatedRequest } from "../types/interface";
import { prisma } from "../config";

export const createEvent = async (
  request: IAuthenticatedRequest,
  response: Response
) => {
  try {
    const { id: worldId } = request.params;
    const { id: userId } = request.user!;
    const { name, description, scheduledAt } = request.body;

    const event = await prisma.event.create({
      data: {
        name,
        description,
        scheduledAt,
        worldId,
        createdById: userId,
      },
    });

    await prisma.eventRSVP.create({
      data: {
        userId,
        eventId: event.id,
      },
    });

    return response.status(200).json({ success: true });
  } catch (error) {
    return response.status(500).json({ error });
  }
};

export const getWorldEvents = async (
  request: IAuthenticatedRequest,
  response: Response
) => {
  try {
    const { id } = request.params;

    const events = await prisma.event.findMany({
      where: { worldId: id },
      include: {
        RSVPs: {
          include: {
            user: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });

    return response.status(200).json({ events });
  } catch (error) {
    return response.status(500).json({ error });
  }
};

export const joinEvent = async (
  request: IAuthenticatedRequest,
  response: Response
) => {
  try {
    const { id: eventId } = request.params;
    const { id: userId } = request.user!;

    await prisma.eventRSVP.create({
      data: {
        userId: userId,
        eventId: eventId,
      },
    });

    return response.status(200).json({ success: true });
  } catch (error) {
    return response.status(500).json({ error });
  }
};
