import express from "express";
import {
  deleteUser,
  fetchAllUsers,
  fetchUserById,
  login,
  signup,
  updateUser,
} from "../controllers/user.controller";
import { requireAuth } from "../middleware/requireAuth";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/fetchUserById", requireAuth, fetchUserById);
router.get("/fetchAllUsers", requireAuth, fetchAllUsers);

router.put("/update", requireAuth, updateUser);

router.delete("/delete", requireAuth, deleteUser);
