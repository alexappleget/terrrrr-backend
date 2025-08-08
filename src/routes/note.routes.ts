import express from "express";
import { requireAuth } from "../middleware/requireAuth";
import { createNote, getWorldNotes } from "../controllers/note.controller";

const router = express.Router();

router.post("/:id", requireAuth, createNote);

router.get("/:id", requireAuth, getWorldNotes);

export default router;
