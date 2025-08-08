import { randomUUID } from "crypto";
import { prisma } from "./config";
import { IBoss } from "./types/interface";

let bosses: IBoss[] = [
  {
    id: randomUUID(),
    name: "King Slime",
    health: "2000",
    stage: "Pre-Hardmode",
  },
  {
    id: randomUUID(),
    name: "Eye of Cthulhu",
    health: "2800",
    stage: "Pre-Hardmode",
  },
  {
    id: randomUUID(),
    name: "Eater of Worlds",
    health: "7485",
    stage: "Pre-Hardmode",
  },
  {
    id: randomUUID(),
    name: "Skeletron",
    health: "4400",
    stage: "Pre-Hardmode",
  },
  {
    id: randomUUID(),
    name: "Wall of Flesh",
    health: "8000",
    stage: "Pre-Hardmode",
  },
  {
    id: randomUUID(),
    name: "Queen Slime",
    health: "18000",
    stage: "Hardmode",
  },
  {
    id: randomUUID(),
    name: "The Twins",
    health: "43000",
    stage: "Hardmode",
  },
  {
    id: randomUUID(),
    name: "The Destroyer",
    health: "80000",
    stage: "Hardmode",
  },
  {
    id: randomUUID(),
    name: "Skeletron Prime",
    health: "28000",
    stage: "Hardmode",
  },
  {
    id: randomUUID(),
    name: "Plantera",
    health: "30000",
    stage: "Hardmode",
  },
  {
    id: randomUUID(),
    name: "Golem",
    health: "60000",
    stage: "Hardmode",
  },
  {
    id: randomUUID(),
    name: "Duke Fishron",
    health: "60000",
    stage: "Hardmode",
  },
  {
    id: randomUUID(),
    name: "Lunatic Cultist",
    health: "32000",
    stage: "Endgame",
  },
  {
    id: randomUUID(),
    name: "Moon Lord",
    health: "145000",
    stage: "Endgame",
  },
];

export const seed = async () => {
  for (let boss of bosses) {
    const existingBoss = await prisma.boss.findUnique({
      where: { name: boss.name },
    });

    if (existingBoss) continue;

    await prisma.boss.create({
      data: {
        id: boss.id,
        name: boss.name,
        health: boss.health,
        stage: boss.stage,
      },
    });
  }

  console.log("Bosses created");
};
