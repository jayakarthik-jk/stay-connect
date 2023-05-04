import { Router } from "express";

import db from "../database";

const router = Router();

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const conversation = db.getConversation(id);
  return res.status(200).json(conversation);
});

export default router;
