import { prisma } from "./prisma";

// find all movies that a user has watched
export const findAllMoviesThatAUserWatched = async (userId: number) => {
  return await prisma.movie.findMany({
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
