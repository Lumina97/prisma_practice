import { prisma } from "./prisma";

export const getNYoungestUsers = (howManyUsersToGrab: number) => {
  return prisma.user.findMany({
    orderBy: { age: "asc" },
    take: howManyUsersToGrab,
  });
};
