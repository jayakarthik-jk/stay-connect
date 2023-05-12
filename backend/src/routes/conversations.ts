import { Router } from "express";
import messages from "./messages";
import db from "../database";
import auth from "../middleware/auth";

const router = Router();

router.get("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const conversation = await db.getConversation(id);
  return res.status(200).json(conversation);
});

router.use("/:conversationId/messages", messages);

router.post("/", auth, async (req, res) => {
  const { email } = req.body;
  if (!req.user) return res.status(400).json({ error: "Signup to continue" });
  const convo = await db.startConversation(email, req.user);
  if (convo instanceof Error)
    return res.status(400).json({ error: convo.message });
  return res.status(200).json(convo);
});

export default router;
