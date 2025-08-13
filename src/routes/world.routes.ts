import express from "express";
import {
  createWorld,
  getAdminData,
  getUserWorlds,
  joinWorld,
  updateWorldDetails,
} from "../controllers/world.controller";
import { requireAuth } from "../middleware/requireAuth";
import { requireRole } from "../middleware/requireRole";

const router = express.Router();

router.post("/create", requireAuth, createWorld);
router.post("/join", requireAuth, joinWorld);

router.get("/", requireAuth, getUserWorlds);
router.get(
  "/adminData/:id",
  requireAuth,
  requireRole(["OWNER", "ADMIN", "SUB_ADMIN"]),
  getAdminData
);

router.patch("/:id", requireAuth, requireRole("OWNER"), updateWorldDetails);

export default router;
