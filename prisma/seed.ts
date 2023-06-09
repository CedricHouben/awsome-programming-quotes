import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { quotes } from "./data/quotes";

const prisma = new PrismaClient();

async function seed() {
  for (const quote of quotes) {
    await prisma.quote.upsert({
      where: { id: quote.id },
      update: quote,
      create: quote,
    });
  }

  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.quotesOnUsers.create({
    data: {
      userId: user.id,
      quoteId: quotes[0].id,
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
