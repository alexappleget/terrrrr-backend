import express from "express";
import { session } from "../controllers/auth.controller";

const router = express.Router();

router.get("/session", session);

export default router;
