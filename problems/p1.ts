import { prisma } from "./prisma";

export const getAllUsers = () => {
  return prisma.user.findMany({
    orderBy: { username: "asc" },
  });
};
