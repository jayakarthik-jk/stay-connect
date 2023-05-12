import { Conversation, PrismaClient, User } from "@prisma/client";
import { UserWithoutPassword } from "../../types";

import * as UsersMolude from "./users";
import * as ConversationModule from "./conversations";
import * as MessageModule from "./messages";
import * as AuthModule from "./auth";

class Prisma {
  static client: PrismaClient;
  static getPrismaClient() {
    if (!Prisma.client) {
      Prisma.client = new PrismaClient();
    }
    return Prisma.client;
  }
}

export const getPrismaClient = Prisma.getPrismaClient;
export function excludePassword(
  user: User & {
    conversations: Conversation[];
  }
): UserWithoutPassword {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    profile: user.profile,
    conversations: user.conversations,
    conversationIds: user.conversationIds,
  };
}

export default {
  ...UsersMolude,
  ...ConversationModule,
  ...AuthModule,
  ...MessageModule,
};
