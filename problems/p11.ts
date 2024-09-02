import { prisma } from "./prisma";

export const createUserWithData = async ({
  username,
  age,
}: {
  username: string;
  age: number;
}) => {
  await prisma.user.create({
    data: {
      username,
      age,
    },
  });
};
