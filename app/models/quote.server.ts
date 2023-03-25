import { prisma } from "~/db.server";

export async function getQuotes() {
  return prisma.quote.findMany({ take: 5 });
}
export async function getQuote(id: string) {
  return prisma.quote.findUnique({ where: { id } });
}

export async function getRandomQuote() {
  const productsCount = await prisma.quote.count();
  const skip = Math.floor(Math.random() * productsCount);
  return await prisma.quote.findFirst({
    take: 1,
    skip: skip,
    orderBy: {
      id: "desc",
    },
  });
}
