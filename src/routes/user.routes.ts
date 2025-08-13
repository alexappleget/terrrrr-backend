import express from "express";
import {
  fetchUserById,
  signIn,
  signOut,
  signUp,
} from "../controllers/user.controller";
import { requireAuth } from "../middleware/requireAuth";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/signout", requireAuth, signOut);

router.get("/fetchUserById", requireAuth, fetchUserById);

export default router;
