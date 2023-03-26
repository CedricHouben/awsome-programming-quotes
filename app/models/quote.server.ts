import { prisma } from "~/db.server";

export class QuoteServer {
  public async getQuotes() {
    return prisma.quote.findMany({ take: 5 });
  }
  public async getQuote(id: string) {
    return prisma.quote.findUnique({ where: { id } });
  }

  public async getBiasedRandomQuote() {
    if (Math.random() < 0.3) {
      return this.getRandomLikedQuote();
    }
    return this.getRandomQuote();
  }

  public async getRandomQuote() {
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

  public async getRandomLikedQuote() {
    const productsCount = await prisma.quote.count({
      where: {
        users: {
          some: {},
        },
      },
    });
    const skip = Math.floor(Math.random() * productsCount);
    return await prisma.quote.findFirst({
      where: {
        users: {
          some: {},
        },
      },
      take: 1,
      skip: skip,
      orderBy: {
        id: "desc",
      },
    });
  }
}
