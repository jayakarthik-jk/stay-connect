import { Router } from "express";
import rateLimit from "express-rate-limit";
import jwt from "jsonwebtoken";

import db from "../database";

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Too many login attempts, please try again later.",
});

router.post("/login", loginLimiter, async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Invalid credentials" });
  const user = await db.login(email, password);
  if (user instanceof Error)
    return res.status(400).json({ error: user.message });
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    res.status(500).json({ error: "something went wrong" });
    process.exit(0);
  }
  const token = jwt.sign(user.id, secret);
  res.setHeader("X-Auth-Token", token);
  return res.status(200).json(user);
});

router.post("/register", loginLimiter, async (req, res) => {
  const { email, name, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: "Invalid credentials" });
  const user = await db.register(email, name, password);
  if (user instanceof Error)
    return res.status(400).json({ error: user.message });
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    res.status(500).json({ error: "something went wrong" });
    process.exit(0);
  }
  const token = jwt.sign(user.id, secret);
  res.setHeader("X-Auth-Token", token);
  return res.status(200).json(user);
});

export default router;
