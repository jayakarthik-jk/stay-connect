import { getPrismaClient } from ".";
import { UserWithoutPassword } from "../../types";
import { genConversationId } from "./conversations";

export async function sendMessage(
  sender: UserWithoutPassword,
  receipient: UserWithoutPassword,
  text: string
) {
  const conversationId = genConversationId(sender.id, receipient.id);
  // check if the conversation exists

  const message = await getPrismaClient().message.create({
    data: {
      content: text,
      senderId: sender.id,
      receiverId: receipient.id,
    },
  });
  // update the conversation if exist
  await getPrismaClient().conversation.update({
    where: {
      conversationId,
    },
    data: {
      lastMessage: text,
      lastMessageBy: sender.id,
      unReadCount: {
        increment: 1,
      },
      messages: {
        connect: {
          id: message.id,
        },
      },
    },
    include: {
      messages: true,
    },
  });
  return message;
}

export async function updateMessageStatus(
  sender: UserWithoutPassword,
  receipient: UserWithoutPassword
) {
  const conversationId = genConversationId(sender.id, receipient.id);

  // check if the conversation exists
  const conversation = await getPrismaClient().conversation.findUnique({
    where: {
      conversationId,
    },
    include: {
      messages: true,
    },
  });
  if (!conversation) return new Error("Conversation not found");
  //  filter the messages that are sent by the receipient
  const messages = conversation.messages.filter(
    (message) => message.senderId === receipient.id
  );
  if (!messages || messages.length < 0) return new Error("No messages found");
  // update the messages in the database
  await getPrismaClient().message.updateMany({
    where: {
      id: {
        in: messages.map((message) => message.id),
      },
    },
    data: {
      status: "read",
    },
  });
  // update the conversation object in the database
  await getPrismaClient().conversation.update({
    where: {
      conversationId,
    },
    data: {
      unReadCount: 0,
    },
  });
  return true;
}
