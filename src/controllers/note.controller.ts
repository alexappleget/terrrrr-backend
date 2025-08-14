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
    const { title, content, tag } = request.body;

    await prisma.note.create({
      data: {
        title,
        content,
        authorId: userId,
        worldId,
        tag,
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

export const deleteNote = async (
  request: IAuthenticatedRequest,
  response: Response
) => {
  try {
    const { id } = request.params;
    console.log("Note id is:", id);

    await prisma.note.delete({
      where: { id },
    });

    return response.status(200).json({ success: true });
  } catch (error) {
    return response.status(500).json({ error });
  }
};
