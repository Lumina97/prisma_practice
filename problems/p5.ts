import { prisma } from "./prisma";

export const getAllMoviesWithAverageScoreOverN = async (n: number) => {
  const ratings = await prisma.starRating.groupBy({
    by: ["movieId"],
    having: {
      score: {
        _avg: {
          gt: n,
        },
      },
    },
  });

  return prisma.movie.findMany({
    where: {
      id: {
        in: ratings.map((rating) => rating.movieId),
      },
    },
  });
};
