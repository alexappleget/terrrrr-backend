import { Response } from "express";
import { IAuthenticatedRequest } from "../types/interface";
import { prisma } from "../config";

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
