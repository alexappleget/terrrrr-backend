import express from "express";
import { requireAuth } from "../middleware/requireAuth";
import {
  getAllMemberships,
  getWorldMembership,
} from "../controllers/worldMembership.controller";

const router = express.Router();

router.get("/all/:id", requireAuth, getAllMemberships);
router.get("/:id", requireAuth, getWorldMembership);

export default router;
