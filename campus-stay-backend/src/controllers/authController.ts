import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret_jwt_token";

export async function signup(req: Request, res: Response) {
  const { email, password, name, role } = req.body;
  if (!email || !password || !name || !role) {
    return res.status(400).json({ error: "Missing fields" });
  }
  if (!["STUDENT", "OWNER"].includes(role)) {
    return res.status(400).json({ error: "Role must be STUDENT or OWNER" });
  }
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "Email already in use" });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed, name, role });
    return res.status(201).json({
      message: "User created",
      user: { email: user.email, name: user.name, role: user.role }
    });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
    return res.status(200).json({ token, user: { email: user.email, name: user.name, role: user.role } });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
