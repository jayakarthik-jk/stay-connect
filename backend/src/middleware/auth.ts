import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import { getUser } from "../database/users";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.get("X-Auth-Token");

  if (!token) return res.status(401).send({ error: "Access denied." });
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      res.status(500).json({ error: "something went wrong" });
      process.exit(0);
    }
    const decoded = jwt.verify(token, secret);

    const user = await getUser(decoded as string);
    if (!user) return res.status(400).send({ error: "Invalid token." });
    if (user instanceof Error) return res.status(400).send(user.message);
    req.user = user;
    next();
  } catch (ex) {
    res.status(400).send({ error: "Invalid token." });
  }
};

export default auth;
