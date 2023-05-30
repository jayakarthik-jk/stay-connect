import { Router } from "express";
import auth from "../middleware/auth";
import { addPost, getMyFriendsPosts } from "../database/posts";
import multer from "multer";
const router = Router({
  mergeParams: true,
});

const pickImage = multer({
  storage: multer.diskStorage({
    destination: "public/uploads/",
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
}).single("image");

router.get("/", auth, async (req, res) => {
  if (!req.user) return res.status(400).json({ error: "user not found" });
  const { posts } = req.user;
  return res.status(200).json(posts);
});

router.post("/", auth, pickImage, async (req, res) => {
  if (!req.user || !req.file)
    return res.status(400).json({ error: "Invalid credentials" });
  const user = await addPost(
    req.user.id,
    req.file.path.replace("public\\", "")
  );
  return res.status(200).json(user);
});

router.get("/friends", auth, async (req, res) => {
  if (!req.user) return res.status(400).json({ error: "user not found" });
  const { id } = req.user;
  const posts = await getMyFriendsPosts(id);
  if (posts instanceof Error) return res.status(400).json(posts);
  return res.status(200).json(posts);
});

export default router;
