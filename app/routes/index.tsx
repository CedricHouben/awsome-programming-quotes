import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import DisplayQuote from "~/components/DisplayQuote";
import { useOptionalUser } from "~/utils";
import { getQuote, getRandomQuote } from "~/models/quote.server";
import { commitSession, getSession, getUserId } from "~/session.server";
import {
  checkIfQuoteIsLiked,
  createOrDeleteQuotesUsers,
} from "~/models/quote-user.server";

export const loader = async ({ request }: LoaderArgs) => {
  const session = await getSession(request);
  const quoteId = session.get("quoteId") || null;
  const quote = quoteId ? await getQuote(quoteId) : await getRandomQuote();
  const userId = await getUserId(request);
  invariant(quote, "Quote not found");
  const liked = userId ? await checkIfQuoteIsLiked(quote?.id, userId) : false;
  return json(
    { quote, liked },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
};

export async function action({ request, params }: ActionArgs) {
  const formData = await request.formData();
  const quoteId = formData.get("quoteId");
  if (quoteId && typeof quoteId === "string") {
    const userId = await getUserId(request);
    const quote = await getQuote(quoteId);
    invariant(quote, `Quote not found: ${params.id}`);
    invariant(userId, `UserId not found: ${request}`);
    await createOrDeleteQuotesUsers(quote?.id, userId);
    const session = await getSession(request);
    // https://stackoverflow.com/questions/71441953/redirect-route-and-display-message
    session.flash("quoteId", quoteId);
    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
  Error("Invariant violation: quoteId is missing in form submit");
}

export const meta: V2_MetaFunction = () => [{ title: "A random quote" }];

export default function QuotePage() {
  const user = useOptionalUser();
  const { quote, liked } = useLoaderData<typeof loader>();

  return <DisplayQuote {...quote} user={user} liked={liked} />;
}
