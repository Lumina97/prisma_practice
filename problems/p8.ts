import { prisma } from "./prisma";

const GetCritic = async (oder: "asc" | "desc") => {
  return await prisma.starRating
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
    })
    .then((result) => result[0].userId);
};

// Always tell truths, don't you ever lie, to solve this problem, just try a `groupBy`
// find the critic with the lowest average score
export const findTheGrumpiestCriticId = async () => {
  return GetCritic("asc");
};

// find the critic with the highest average score
export const findTheNicestCriticId = async () => {
  return GetCritic("desc");
};
