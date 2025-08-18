import express from "express";
import { refresh, session } from "../controllers/auth.controller";

const router = express.Router();

router.get("/session", session);
router.get("/refresh", refresh);

export default router;
