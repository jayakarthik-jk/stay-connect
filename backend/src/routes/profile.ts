import { Router } from "express";
import db from "../database";
import auth from "../middleware/auth";
import multer from "multer";
import path from "path";

const router = Router();

router.get("/", auth, async (req, res) => {
  if (!req.user)
    return res.status(401).json({ isLoggedIn: false, error: "unauthorized" });
  return res.status(200).send({ url: req.user.profile });
});

const pickProfile = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, "public/profiles");
    },
    filename: (_req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".png") {
      return cb(new Error("only jpg, png are allowed"));
    }
    cb(null, true);
  },
}).single("profile");

router.post("/", auth, pickProfile, async (req, res) => {
  if (!req.user)
    return res.status(401).json({ isLoggedIn: false, error: "unauthorized" });
  if (!req.file) return res.status(400).send({ error: "no file" });
  const updatedUser = await db.updateProfile(req.user.id, req.file.path);
  return res.status(200).send(updatedUser);
});

export default router;
