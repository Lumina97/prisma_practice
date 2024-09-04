import { prisma } from "./prisma";

const GetCritic = (oder: "asc" | "desc") => {
  return prisma.starRating
    .groupBy({
      by: ["userId"],
      _avg: {
        score: true,
      },
      orderBy: {
        _avg: {
          score: oder,
        },
      },
      take: 1,
    })
    .then((result) => result[0].userId);
};

export const findTheGrumpiestCriticId = () => {
  return GetCritic("asc");
};

export const findTheNicestCriticId = () => {
  return GetCritic("desc");
};
