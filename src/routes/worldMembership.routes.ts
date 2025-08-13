import express from "express";
import { requireAuth } from "../middleware/requireAuth";
import {
  getAllMemberships,
  getWorldMembership,
  updateMemberRole,
} from "../controllers/worldMembership.controller";
import { requireRole } from "../middleware/requireRole";

const router = express.Router();

router.get("/all/:id", requireAuth, getAllMemberships);
router.get("/:id", requireAuth, getWorldMembership);

router.patch("/:id", requireAuth, requireRole("OWNER"), updateMemberRole);

export default router;
