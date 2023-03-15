import { Server } from "socket.io";
import db from "./database";

function initSocket(httpServer: any) {
  const io = new Server(httpServer);

  io.on("connection", async (socket) => {
    const email = socket.handshake.query.email as string;
    let user = await db.getUser(email);
    if (!user) user = await db.createUser(email);
    socket.join(user.id);

    user.friends.forEach((friendId: string) => {
      socket.to(friendId).emit("user-online", { email: user!.email });
    });

    socket.on("send-message", async (email: string, text: string) => {
      const receipient = await db.getUser(email);
      if (!receipient || !user) return;
      await db.sendMessage(user, receipient, text);
      socket.to(receipient.id).emit("receive-message", {
        text,
        email: user.email,
      });
    });

    socket.on("message-seen", async (email: string) => {
      const receipient = await db.getUser(email);
      if (!receipient || !user) return;
      await db.updateMessageStatus(user, receipient);
      socket.to(receipient.id).emit("message-seen", { email: user!.email });
    });

    socket.on("add-friend", async (email: string) => {
      const friend = await db.getUser(email);
      if (!friend || !user) return;
      const request = await db.sendFriendRequest(user.id, friend.id);
      if (request instanceof Error) return;
      socket.to(friend.id).emit("friend-request", { email: user.email });
    });

    socket.on("accept-friend", async (email: string) => {
      const friend = await db.getUser(email);
      if (!friend || !user) return;
      await db.acceptFriendRequest(user, friend);
      socket.to(friend.id).emit("friend-accepted", { email: user!.email });
    });

    socket.on("reject-friend", async (email: string) => {
      const friend = await db.getUser(email);
      if (!friend || !user) return;
      await db.rejectFriendRequest(user, friend);
      socket.to(friend.id).emit("friend-rejected", { email: user!.email });
    });

    socket.on("disconnect", () => {
      user!.friends.forEach((friendId) =>
        socket.to(friendId).emit("user-offline", { email: user!.email })
      );
    });
  });
}

export default initSocket;
