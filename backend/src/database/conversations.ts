import { getPrismaClient } from ".";
import { UserWithoutPassword } from "../../types";

export async function getConversations(userId: string) {
  return await getPrismaClient().user.findUnique({
    where: {
      id: userId,
    },
    select: {
      conversations: {
        include: {
          participants: true,
        },
      },
    },
  });
}

export function genConversationId(senderId: string, receipientId: string) {
  return senderId > receipientId
    ? `${senderId}-${receipientId}`
    : `${receipientId}-${senderId}`;
}

export function genFriendId(conversationId: string, userId: string) {
  return conversationId.replace(userId, "").replace("-", "");
}

export async function getConversation(conversationId: string) {
  // get the user id from parameter and check if the user is authorized
  // to get this conversation.

  const conversation = await getPrismaClient().conversation.findUnique({
    where: {
      conversationId,
    },
    include: {
      messages: true,
    },
  });

  return conversation;
}

export async function startConversation(
  email: string,
  user: UserWithoutPassword
) {
  //TODO: in future after implementing auth receive user instead of userID

  const newFriend = await getPrismaClient().user.findUnique({
    where: {
      email,
    },
  });
  if (!newFriend) return new Error("No user found. Invite them");

  const conversationId = genConversationId(user.id, newFriend.id);
  let conversation = await getPrismaClient().conversation.findUnique({
    where: {
      conversationId,
    },
    include: {
      participants: true,
      messages: true,
    },
  });
  if (!conversation) {
    conversation = await getPrismaClient().conversation.create({
      data: {
        conversationId,
        lastMessage: "",
        lastMessageBy: user.id,
        participants: {
          connect: [
            {
              id: user.id,
            },
            {
              id: newFriend.id,
            },
          ],
        },
      },
      include: {
        participants: true,
        messages: true,
      },
    });
  }
  return conversation;
}

export async function getMessagesByConversationId(conversationId: string) {
  const response = await getPrismaClient().conversation.findUnique({
    where: {
      conversationId,
    },
    select: {
      messages: true,
    },
  });
  if (!response) return new Error("conversation not found");
  return response.messages;
}
