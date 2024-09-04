import { prisma } from "./prisma";

export const createUserWithData = ({
  username,
  age,
}: {
  username: string;
  age: number;
}) => {
  return prisma.user.create({
    data: {
      username,
      age,
    },
  });
};
