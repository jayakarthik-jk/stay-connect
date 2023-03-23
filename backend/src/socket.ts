import { Server, Socket } from "socket.io";
import db, { UserWithoutPassword } from "./database";
import LRUCache from "lru-cache";

const cache = new LRUCache<string, UserWithoutPassword>({
  max: 1000,
});

async function getUserByEmail(
  email: string
): Promise<UserWithoutPassword | null> {
  let user: UserWithoutPassword | undefined | null = cache.get(email);
  if (!user) {
    user = await db.getUser(email);
    if (!user) return null;
    cache.set(email, user);
  }
  return user;
}

function initSocket(httpServer: any) {
  const io = new Server(httpServer);

  io.on("connection", async (socket: Socket) => {
    const email = socket.handshake.query.email as string;
    const user = await getUserByEmail(email);
    if (!user) {
      socket.disconnect();
      return;
    }
    socket.join(user.id);

    user.friendsSet = new Set(user.friends);

    user.friends.forEach((friendId: string) => {
      socket.to(friendId).emit("user-online", { email: user.email });
    });

    socket.on("send-message", async (email: string, text: string) => {
      const receipient = await getUserByEmail(email);
      if (!receipient || !user.friendsSet?.has(receipient.id)) return;

      await db.sendMessage(user, receipient, text);
      socket.to(receipient.id).emit("receive-message", {
        text,
        email: user.email,
      });
    });

    socket.on("message-seen", async (email: string) => {
      const receipient = await getUserByEmail(email);
      if (!receipient) return;
      await db.updateMessageStatus(user, receipient);
      socket.to(receipient.id).emit("message-seen", { email: user.email });
    });

    socket.on("add-friend", async (email: string) => {
      const friend = await getUserByEmail(email);
      if (!friend) return;
      const request = await db.sendFriendRequest(user, friend);
      if (request instanceof Error) return;
      socket.to(friend.id).emit("friend-request", { email: user.email });
    });

    socket.on("accept-friend", async (email: string) => {
      const friend = await getUserByEmail(email);
      if (!friend) return;
      await db.acceptFriendRequest(user, friend);
      socket.to(friend.id).emit("friend-accepted", { email: user.email });
    });

    socket.on("reject-friend", async (email: string) => {
      const friend = await getUserByEmail(email);
      if (!friend) return;
      await db.rejectFriendRequest(user, friend);
      socket.to(friend.id).emit("friend-rejected", { email: user.email });
    });

    socket.on("disconnect", () => {
      user.friends.forEach((friendId) =>
        socket.to(friendId).emit("user-offline", { email: user.email })
      );
    });
  });
}

export default initSocket;
