import { redirect } from "@remix-run/server-runtime";
import invariant from "tiny-invariant";
import { createOrDeleteQuotesUsers } from "~/models/quote-user.server";
import { QuoteServer } from "~/models/quote.server";
import { getUserId, getSession, commitSession } from "~/session.server";

export async function handleLike(formData: FormData, request: Request) {
  const quoteId = formData.get("quoteId");
  if (quoteId && typeof quoteId === "string") {
    const userId = await getUserId(request);
    const quoteServer = new QuoteServer();
    const quote = await quoteServer.getQuote(quoteId);
    invariant(quote, `Quote not found: ${quoteId}`);
    invariant(userId, `UserId not found: ${request}`);
    await createOrDeleteQuotesUsers(quote?.id, userId);
    return quoteId;
  }
}

export async function handleLikeWithRedirect(
  formData: FormData,
  request: Request,
  redirectUrl: string
) {
  const quoteId = await handleLike(formData, request);
  const session = await getSession(request);
  // https://stackoverflow.com/questions/71441953/redirect-route-and-display-message
  session.flash("quoteId", quoteId);
  return redirect(redirectUrl, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function handlePlayPause(
  formData: FormData,
  request: Request,
  redirectUrl: string
) {
  const quoteId = formData.get("quoteId");
  if (quoteId && typeof quoteId === "string") {
    const session = await getSession(request);
    // https://stackoverflow.com/questions/71441953/redirect-route-and-display-message
    session.flash("quoteId", quoteId);
    return redirect(redirectUrl, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
}
