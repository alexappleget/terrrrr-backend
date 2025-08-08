import express from "express";
import {
  createWorld,
  getUserWorlds,
  joinWorld,
} from "../controllers/world.controller";
import { requireAuth } from "../middleware/requireAuth";

const router = express.Router();

router.post("/create", requireAuth, createWorld);
router.post("/join", requireAuth, joinWorld);

router.get("/", requireAuth, getUserWorlds);

export default router;
