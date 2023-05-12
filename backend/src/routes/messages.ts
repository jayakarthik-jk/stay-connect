import { Router } from "express";
import { getMessagesByConversationId } from "../database/conversations";
import auth from "../middleware/auth";
const router = Router({
  mergeParams: true,
});

router.get("/", auth, async (req, res) => {
  const { conversationId } = req.params as { conversationId: string };
  if (!conversationId)
    return res.status(400).json({ error: "missing credentials" });
  const messages = await getMessagesByConversationId(conversationId);
  if (messages instanceof Error)
    return res.status(400).json({ error: messages.message });
  res.status(200).json(messages);
});

export default router;
