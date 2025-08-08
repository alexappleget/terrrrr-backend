import express from "express";
import { requireAuth } from "../middleware/requireAuth";
import {
  createEvent,
  getWorldEvents,
  joinEvent,
  leaveEvent,
} from "../controllers/event.controller";

const router = express.Router();

router.post("/:id", requireAuth, createEvent);
router.post("/join/:id", requireAuth, joinEvent);

router.get("/:id", requireAuth, getWorldEvents);

router.delete("/:id", requireAuth, leaveEvent);

export default router;
