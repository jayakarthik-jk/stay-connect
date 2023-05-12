import { Conversation, User } from "@prisma/client";
import { Request } from "express";

export type UserWithoutPassword = Omit<
  User & {
    conversations: Conversation[];
  },
  "password"
>;

declare global {
  namespace Express {
    interface Request {
      user?: UserWithoutPassword;
    }
  }
}
