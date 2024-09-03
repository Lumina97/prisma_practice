import { object } from "zod";
import { prisma } from "./prisma";

// Deleting a thing, only works swell, if things that reference it are deleted as well
export const deleteAllUsersWithAgeUnderN = async (n: number) => {
  const idsToDelete = (
    await prisma.user.findMany({
      select: {
        id: true,
      },
      where: {
        age: {
          lt: n,
        },
      },
    })
  ).map((id) => id.id);

  const deleteRatings = prisma.starRating.deleteMany({
    where: {
      userId: {
        in: idsToDelete,
      },
    },
  });

  const deleteUsers = prisma.user.deleteMany({
    where: {
      id: {
        in: idsToDelete,
      },
    },
  });

  await prisma.$transaction([deleteRatings, deleteUsers]);
};
