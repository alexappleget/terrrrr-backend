import crypto from "crypto";
import { IUser } from "../types/interface";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

let users: IUser[] = [
  {
    id: `${Date.now()}`,
    username: "Zezima",
    password: "123123123",
    salt: "12345",
  },
  {
    id: `${Date.now()}`,
    username: "NoobSlaya123",
    password: "123123123",
    salt: "12345",
  },
  {
    id: `${Date.now()}`,
    username: "MonkeyBoi123",
    password: "123123123",
    salt: "12345",
  },
  {
    id: `${Date.now()}`,
    username: "Critz123",
    password: "123123123",
    salt: "12345",
  },
  {
    id: `${Date.now()}`,
    username: "Ter123",
    password: "123123123",
    salt: "12345",
  },
];

export const seed = async () => {
  const createdUsers: IUser[] = [];

  for (let user of users) {
    const existingUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (existingUser) continue;

    user.salt = `${Date.now()}`;
    user.password = crypto
      .createHash("sha256")
      .update(user.password + user.salt)
      .digest("hex");

    const createdUser = await prisma.user.create({
      data: {
        username: user.username,
        password: user.password,
        salt: user.salt,
      },
    });
    createdUsers.push(createdUser);
  }

  const createdWorld = await prisma.world.create({
    data: { name: "Test World 1", ownerId: createdUsers[0].id! },
  });

  for (let i = 1; i < createdUsers.length; i++) {
    await prisma.worldMember.create({
      data: {
        userId: createdUsers[i].id!,
        worldId: createdWorld.id,
        role: "MEMBER",
      },
    });
  }

  console.log("Seed complete");
};
