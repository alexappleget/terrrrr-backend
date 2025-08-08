import express from "express";
import {
  deleteUser,
  fetchUserById,
  signIn,
  signOut,
  signUp,
  updateUser,
} from "../controllers/user.controller";
import { requireAuth } from "../middleware/requireAuth";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/signout", requireAuth, signOut);

router.get("/fetchUserById", requireAuth, fetchUserById);

router.put("/update", requireAuth, updateUser);

router.delete("/delete", requireAuth, deleteUser);

export default router;
