import { Server } from "socket.io";
import LRUCache from "lru-cache";

import db from "./database";
import { UserWithoutPassword } from "../types";
import { getUser } from "./database/users";

const cache = new LRUCache<string, UserWithoutPassword>({
  max: 1000,
});

async function getUserByEmail(
  email: string
): Promise<UserWithoutPassword | null> {
  let user: UserWithoutPassword | undefined | null = cache.get(email);
  if (!user) {
    user = await db.getUserByEmail(email);
    if (!user) return null;
    cache.set(email, user);
  }
  return user;
}

function initSocket(httpServer: any) {
  const io = new Server(httpServer);

  io.on("connection", async (socket: any) => {
    const email = socket.handshake.query.email as string;

    if (!email) return socket.disconnect();
    const user = await getUserByEmail(email);
    if (!user) return socket.disconnect();
    socket.join(user.id);
    console.log(`client: ${user.name} connected`);

    // user.friendsSet.forEach((friendId: string) => {
    //   socket.to(friendId).emit("user-online", { id: user.id });
    // });

    socket.on("send-message", async (id: string, text: string) => {
      const receipient = await getUser(id);
      if (!receipient) return;
      console.log(
        `sending message "${text}" from ${user.name} to ${receipient.name}`
      );
      const message = await db.sendMessage(user, receipient, text);
      socket.to(user.id).emit("message-sent", { message });
      socket.to(receipient.id).emit("receive-message", { message });
    });

    socket.on("message-seen", async (id: string) => {
      const receipient = await getUser(id);
      if (!receipient) return;
      console.log("client seen the messages");
      await db.updateMessageStatus(user, receipient);
      // socket.to(receipient.id).emit("message-seen", { id: user.id });
    });

    // socket.on("disconnect", () => {
    //   user.friendsSet?.forEach((friendId) =>
    //     socket.to(friendId).emit("user-offline", { id: user.id })
    //   );
    // });
  });
  io.on("error", (error: any) => {
    console.error("Socket error:", error);
  });
}

export default initSocket;
