import type { Quote, User } from "@prisma/client";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";
export async function checkIfQuoteIsLiked(quoteId: string, userId: string) {
  const quotesOnUser = await prisma.quote
    .findFirst({ where: { id: quoteId } })
    .users({ where: { userId } });
  return !!quotesOnUser?.length;
}

export async function createOrDeleteQuotesUsers(
  quoteId: Quote["id"],
  userId: User["id"]
) {
  const quote = prisma.quote.findUnique({ where: { id: quoteId } });
  const user = prisma.user.findUnique({ where: { id: userId } });
  if (!quote || !user) {
    return null;
  }
  const quotesOnUser = await prisma.quotesOnUsers.findFirst({
    where: {
      quoteId: quoteId,
      userId: userId,
    },
  });
  if (quotesOnUser) {
    return prisma.quotesOnUsers.delete({
      where: {
        quoteId_userId: {
          quoteId: quoteId,
          userId: userId,
        },
      },
    });
  }
  return prisma.quotesOnUsers.create({
    data: {
      quoteId: quoteId,
      userId: userId,
    },
  });
}
