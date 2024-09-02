import { prisma } from "./prisma";

// hint:find all stars with the movies "included" on, then good ol' javascript should finish the job
// This one should require more javascript work than the previous ones

type TMovieType = {
  id: number;
  title: string;
  releaseYear: number;
  parentalRating: string;
};

type TMapMovieType = {
  score: number;
  amount: number;
  movie: TMovieType;
};

//I assume there is a way easier way to do this.
//I seem to have trouble seeing more complex solutions currently
//or maybe I don't know enough of the tools available to me yet
export const getAllMoviesWithAverageScoreOverN = async (n: number) => {
  const averageMap: Map<number, TMapMovieType> = new Map();
  const ratings = await prisma.starRating.findMany({
    include: { movie: true },
  });

  for (let i = 0; i < ratings.length; i++) {
    const movieRating = ratings[i];
    const { movieId, score } = movieRating;
    const current = averageMap.get(movieId);

    if (!current) {
      averageMap.set(movieId, { score, amount: 1, movie: movieRating.movie });
    } else {
      const currentScore = current.score + score || score;
      const currentAmount = current.amount + 1 || 1;

      averageMap.set(movieId, {
        score: currentScore,
        amount: currentAmount,
        movie: movieRating.movie,
      });
    }
  }
  const result: TMovieType[] = [];

  averageMap.forEach((value) => {
    const average = value.score / value.amount;
    if (average <= n) return;
    result.push(value.movie);
  });

  return result;
};
