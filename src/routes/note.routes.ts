import express from "express";
import { requireAuth } from "../middleware/requireAuth";
import {
  createNote,
  deleteNote,
  getWorldNotes,
} from "../controllers/note.controller";
import { requireRole } from "../middleware/requireRole";

const router = express.Router();

router.post("/:id", requireAuth, createNote);

router.get("/:id", requireAuth, getWorldNotes);

router.delete(
  "/:id",
  requireAuth,
  requireRole(["OWNER", "ADMIN", "SUB_ADMIN"]),
  deleteNote
);

export default router;
