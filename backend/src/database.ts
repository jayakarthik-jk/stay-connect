import { Conversation, PrismaClient, Request, User } from "@prisma/client";
import bcrypt from "bcrypt";

let prisma = new PrismaClient();

export type UserWithoutPassword = Omit<
  User & {
    Conversations: Conversation[];
    incomingRequests: Request[];
    outgoingRequests: Request[];
    friendsSet?: Set<string>;
  },
  "password"
>;

function getPrismaClient() {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
}

function excludePassword(
  user: User & {
    Conversations: Conversation[];
    incomingRequests: Request[];
    outgoingRequests: Request[];
  }
): UserWithoutPassword {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    friends: user.friends,
    profile: user.profile,
    incomingRequests: user.incomingRequests,
    outgoingRequests: user.outgoingRequests,
    Conversations: user.Conversations,
  };
}

async function login(email: string, password: string) {
  const user = await getPrismaClient().user.findUnique({
    where: {
      email,
    },
    include: {
      Conversations: true,
      incomingRequests: true,
      outgoingRequests: true,
    },
  });
  if (!user) {
    return new Error("User not found");
  }
  const result = await bcrypt.compare(password, user.password);
  if (!result) {
    return new Error("Invalid Password");
  }
  return excludePassword(user);
}

async function register(email: string, name: string, password: string) {
  const user = await getPrismaClient().user.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    return new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await getPrismaClient().user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
    include: {
      Conversations: true,
      incomingRequests: true,
      outgoingRequests: true,
    },
  });
  return excludePassword(newUser);
}

async function getUser(email: string) {
  // Get user from database
  const user = await getPrismaClient().user.findUnique({
    where: {
      email,
    },
    include: {
      Conversations: true,
      incomingRequests: true,
      outgoingRequests: true,
    },
  });
  return user ? excludePassword(user) : null;
}

async function getConversation(conversationId: string) {
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

// async function sendFriendRequest(
//   user: UserWithoutPassword,
//   friend: UserWithoutPassword
// ) {
//   return await getPrismaClient().$transaction(async (prisma) => {
//     // create a request onject in the database
//     const request = await prisma.request.create({
//       data: {
//         senderId: user.id,
//         receiverId: friend.id,
//       },
//     });
//     // update the user objects in the database
//     await prisma.user.update({
//       where: {
//         id: user.id,
//       },
//       data: {
//         outgoingRequests: {
//           connect: {
//             id: request.id,
//           },
//         },
//       },
//     });
//     // update the friend object in the database
//     await prisma.user.update({
//       where: {
//         id: friend.id,
//       },
//       data: {
//         incomingRequests: {
//           connect: {
//             id: request.id,
//           },
//         },
//       },
//     });
//     return request;
//   });
// }

// async function acceptFriendRequest(
//   user: UserWithoutPassword,
//   friend: UserWithoutPassword
// ) {
//   return await getPrismaClient().$transaction(async (prisma) => {
//     // check if the request exists
//     const requests = await prisma.request.findMany({
//       where: {
//         senderId: friend.id,
//         receiverId: user.id,
//       },
//     });
//     const request = requests[0];
//     if (!request) return new Error("Request not found");
//     // update the user objects in the database
//     const updatedUser = await prisma.user.update({
//       where: {
//         id: user.id,
//       },
//       data: {
//         friends: {
//           push: friend.id,
//         },
//       },
//     });
//     // update the friend object in the database
//     await prisma.user.update({
//       where: {
//         id: friend.id,
//       },
//       data: {
//         friends: {
//           push: user.id,
//         },
//       },
//     });
//     await prisma.request.update({
//       where: {
//         id: request.id,
//       },
//       data: {
//         status: "accepted",
//       },
//     });
//     return updatedUser;
//   });
// }

// async function rejectFriendRequest(
//   user: UserWithoutPassword,
//   friend: UserWithoutPassword
// ) {
//   return await getPrismaClient().$transaction(async (prisma) => {
//     // check if the request exists
//     const requests = await prisma.request.findMany({
//       where: {
//         senderId: friend.id,
//         receiverId: user.id,
//       },
//     });
//     const request = requests[0];
//     if (!request) return new Error("Request not found");
//     // update the user objects in the database
//     const updatedUser = await prisma.user.update({
//       where: {
//         id: user.id,
//       },
//       data: {
//         incomingRequests: {
//           disconnect: {
//             id: request.id,
//           },
//         },
//       },
//     });
//     // update the friend object in the database
//     await prisma.request.update({
//       where: {
//         id: request.id,
//       },
//       data: {
//         status: "rejected",
//       },
//     });
//     return updatedUser;
//   });
// }

// async function sendMessage(
//   sender: UserWithoutPassword,
//   receipient: UserWithoutPassword,
//   text: string
// ) {
//   const conversationId =
//     sender.id > receipient.id
//       ? `${sender.id}-${receipient.id}`
//       : `${receipient.id}-${sender.id}`;
//   // check if the conversation exists
//   let conversation = await getPrismaClient().conversation.findUnique({
//     where: {
//       conversationId,
//     },
//     include: {
//       messages: true,
//     },
//   });
//   if (!conversation) {
//     // create a conversation object in the database
//     conversation = await getPrismaClient().conversation.create({
//       data: {
//         conversationId,
//         lastMessage: text,
//         lastMessageBy: sender.id,
//         unReadCount: 1,
//         messages: {
//           create: {
//             senderId: sender.id,
//             receiverId: receipient.id,
//             content: text,
//           },
//         },
//       },
//       include: {
//         messages: true,
//       },
//     });
//   } else {
//     // update the conversation object in the database
//     conversation = await getPrismaClient().conversation.update({
//       where: {
//         conversationId,
//       },
//       data: {
//         lastMessage: text,
//         lastMessageBy: sender.id,
//         unReadCount: {
//           increment: 1,
//         },
//         messages: {
//           create: {
//             senderId: sender.id,
//             receiverId: receipient.id,
//             content: text,
//           },
//         },
//       },
//       include: {
//         messages: true,
//       },
//     });
//   }
//   return conversation;
// }

// async function updateMessageStatus(
//   sender: UserWithoutPassword,
//   receipient: UserWithoutPassword
// ) {
//   const conversationId =
//     sender.id > receipient.id
//       ? `${sender.id}-${receipient.id}`
//       : `${receipient.id}-${sender.id}`;

//   // check if the conversation exists
//   const conversation = await getPrismaClient().conversation.findUnique({
//     where: {
//       conversationId,
//     },
//     include: {
//       messages: true,
//     },
//   });
//   if (!conversation) return new Error("Conversation not found");
//   //  filter the messages that are sent by the receipient
//   const messages = conversation.messages.filter(
//     (message) => message.senderId === receipient.id
//   );
//   if (!messages || messages.length < 0) return new Error("No messages found");
//   // update the messages in the database
//   const updatedMessages = await getPrismaClient().message.updateMany({
//     where: {
//       id: {
//         in: messages.map((message) => message.id),
//       },
//     },
//     data: {
//       status: "read",
//     },
//   });
//   // update the conversation object in the database
//   await getPrismaClient().conversation.update({
//     where: {
//       conversationId,
//     },
//     data: {
//       unReadCount: 0,
//     },
//   });

//   return updatedMessages;
// }

export default {
  getUser,
  login,
  register,
  getConversation,
  // sendFriendRequest,
  // acceptFriendRequest,
  // rejectFriendRequest,
  // sendMessage,
  // updateMessageStatus,
};
