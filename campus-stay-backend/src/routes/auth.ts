import express from "express";
import { signup, login } from "../controllers/authController";

const router = express.Router();

// POST /api/auth/signup - Register a new user (STUDENT or OWNER)
router.post("/signup", signup);

// POST /api/auth/login - Authenticate a user
router.post("/login", login);

export default router;
