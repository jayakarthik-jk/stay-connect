import { getPrismaClient } from ".";

export async function getMyFriendsPosts(id: string) {
  const user = await getPrismaClient().user.findUnique({
    where: {
      id,
    },
    include: {
      conversations: {
        include: {
          participants: true,
        },
      },
    },
  });
  if (!user) return new Error("user not found");
  const friends = user.conversations.map((conversation) => {
    return conversation.participants[0].id === user.id
      ? conversation.participants[1]
      : conversation.participants[0];
  });

  const posts = friends.flatMap((friend) => friend.posts);
  return posts;
}

export async function addPost(id: string, image: string) {
  return getPrismaClient().user.update({
    where: { id },
    data: { posts: { push: image } },
  });
}
