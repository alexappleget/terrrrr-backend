import express from "express";
import { requireAuth } from "../middleware/requireAuth";
import { getWorldBosses } from "../controllers/boss.controller";

const router = express.Router();

router.get("/:id", requireAuth, getWorldBosses);

export default router;
