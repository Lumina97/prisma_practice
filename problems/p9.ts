import { prisma } from "./prisma";

export const updateUsername = (userId: number, newUsername: string) => {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      username: newUsername,
    },
  });
};
