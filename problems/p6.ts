import { prisma } from "./prisma";

// find all movies that a user has watched
export const findAllMoviesThatAUserWatched = (userId: number) => {
  return prisma.movie.findMany({
    where: {
      starRatings: {
        some: {
          userId: userId,
        },
      },
    },
    include: {
      starRatings: false,
    },
  });
};
