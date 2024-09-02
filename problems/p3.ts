import { prisma } from "./prisma";

// Get the average age of all users
// hint: the hot tub is hot, the water is great, to solve this problem you should "aggregate"
export const getAverageUserAge = async () => {
  return (await prisma.user.aggregate({ _avg: { age: true } }))._avg.age;
};
