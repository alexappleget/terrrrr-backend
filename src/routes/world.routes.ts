import express from "express";
import {
  createWorld,
  getAdminData,
  getUserWorlds,
  joinWorld,
} from "../controllers/world.controller";
import { requireAuth } from "../middleware/requireAuth";

const router = express.Router();

router.post("/create", requireAuth, createWorld);
router.post("/join", requireAuth, joinWorld);

router.get("/", requireAuth, getUserWorlds);
router.get("/adminData/:id", requireAuth, getAdminData);

export default router;
