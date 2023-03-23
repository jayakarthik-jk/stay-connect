import { Router } from "express";
import rateLimit from "express-rate-limit";
import db from "./database";

const router = Router();

router.get("/", (req, res) => res.send("Stay Connect"));

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Too many login attempts, please try again later.",
});

router.post("/login", loginLimiter, async (req, res) => {
  const { email, password } = req.body;
  const user = await db.login(email, password);
  if (user instanceof Error) {
    return res.status(400).json({ message: user.message });
  }
  return res.status(200).json(user);
});

router.post("/register", loginLimiter, async (req, res) => {
  const { email, name, password } = req.body;
  const user = await db.register(email, name, password);
  if (user instanceof Error) {
    return res.status(400).json({ message: user.message });
  }
  return res.status(200).json(user);
});

export default router;
