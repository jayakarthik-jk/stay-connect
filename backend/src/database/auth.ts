import bcrypt from "bcrypt";

import { getPrismaClient, excludePassword } from ".";

export async function login(email: string, password: string) {
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
  if (!user) {
    return new Error("User not found");
  }

  const result = await bcrypt.compare(password, user.password);
  if (!result) {
    return new Error("Invalid Password");
  }
  return excludePassword(user);
}

export async function register(email: string, name: string, password: string) {
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
      conversations: {
        include: {
          messages: true,
        },
      },
    },
  });
  return excludePassword(newUser);
}
