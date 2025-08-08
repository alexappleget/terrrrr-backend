import express from "express";
import {
  createNote,
  createWorld,
  fetchAllMemberships,
  getUserWorlds,
  getWorldBosses,
  getWorldMembership,
  getWorldNotes,
  joinWorld,
} from "../controllers/world.controller";
import { requireAuth } from "../middleware/requireAuth";

const router = express.Router();

router.post("/createWorld", requireAuth, createWorld);
router.post("/joinWorld", requireAuth, joinWorld);
router.post("/notes/:id", requireAuth, createNote);

router.get("/fetchUserWorlds", requireAuth, getUserWorlds);
router.get("/:id", requireAuth, getWorldMembership);
router.get("/bosses/:id", requireAuth, getWorldBosses);
router.get("/notes/:id", requireAuth, getWorldNotes);
router.get("/allMemberships/:id", requireAuth, fetchAllMemberships);

export default router;
