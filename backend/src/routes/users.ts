import { Router } from "express";
import db from "../database";
import auth from "../middleware/auth";
import profile from "./profile";

const router = Router();

router.get("/me", auth, async (req, res) => {
  if (!req.user)
    return res.status(401).json({ isLoggedIn: false, error: "unauthorized" });
  return res.status(200).send({ isLoggedIn: true, user: req.user });
});

router.get("/conversations", auth, async (req, res) => {
  const id = req.user?.id;
  if (!id) return res.status(400).json({ error: "missing credentials" });
  const convo = await db.getConversations(id);
  if (!convo)
    return res.status(404).json({ message: "Conversation not found" });
  return res.status(200).json(convo.conversations);
});

router.use("/profile", profile);

export default router;
