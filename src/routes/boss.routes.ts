import express from "express";
import { requireAuth } from "../middleware/requireAuth";
import {
  getWorldBosses,
  setBossKilledState,
} from "../controllers/boss.controller";
import { requireRole } from "../middleware/requireRole";

const router = express.Router();

router.get("/:id", requireAuth, getWorldBosses);

router.patch(
  "/:id",
  requireAuth,
  requireRole(["OWNER", "ADMIN", "SUB_ADMIN"]),
  setBossKilledState
);

export default router;
