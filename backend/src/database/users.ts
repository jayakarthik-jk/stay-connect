import { getPrismaClient, excludePassword } from ".";

export async function getUser(id: string) {
  // Get user from database
  const user = await getPrismaClient().user.findUnique({
    where: {
      id,
    },
    include: {
      conversations: {
        include: {
          participants: true,
          messages: true,
        },
      },
    },
  });
  return user ? excludePassword(user) : null;
}

export async function getUserByEmail(email: string) {
  // Get user from database
  const user = await getPrismaClient().user.findUnique({
    where: {
      email,
    },
    include: {
      conversations: {
        include: {
          participants: true,
          messages: true,
        },
      },
    },
  });
  return user ? excludePassword(user) : null;
}

// create a async function to update profile
export async function updateProfile(id: string, profile: string) {
  // update profile in database
  const user = await getPrismaClient().user.update({
    where: {
      id,
    },
    data: {
      profile,
    },
    include: {
      conversations: true,
    },
  });
  return user ? excludePassword(user) : null;
}
