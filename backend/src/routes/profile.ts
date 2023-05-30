import { Router } from "express";
import db from "../database";
import auth from "../middleware/auth";
import multer from "multer";

const router = Router();

router.get("/", auth, async (req, res) => {
  if (!req.user)
    return res.status(401).json({ isLoggedIn: false, error: "unauthorized" });
  return res.status(200).send({ url: req.user.profile });
});

const pickProfile = multer({
  storage: multer.diskStorage({
    destination: "public/profiles/",
    filename: function (_req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname +
          "-" +
          uniqueSuffix +
          "." +
          file.originalname.split(".").pop()
      );
    },
  }),
}).single("profile");

router.post("/", auth, pickProfile, async (req, res) => {
  if (!req.user)
    return res.status(401).json({ isLoggedIn: false, error: "unauthorized" });
  if (!req.file) return res.status(400).send({ error: "no file" });
  const updatedUser = await db.updateProfile(
    req.user.id,
    req.file.path.replace("public\\", "")
  );
  return res.status(200).send(updatedUser);
});

export default router;
