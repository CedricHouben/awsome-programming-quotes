import type {
  ActionArgs,
  LoaderArgs,
  V2_MetaFunction} from "@remix-run/node";


import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import DisplayQuote from "~/components/DisplayQuote";
import {
  checkIfQuoteIsLiked,
  createOrDeleteQuotesUsers,
} from "~/models/quote-user.server";
import { getQuote } from "~/models/quote.server";
import { getUserId } from "~/session.server";
import { useOptionalUser } from "~/utils";

export const loader = async ({ params, request }: LoaderArgs) => {
  invariant(params.id, `params.id is required`);
  const userId = await getUserId(request);
  const quote = await getQuote(params.id);
  invariant(quote, `Quote not found: ${params.id}`);

  const liked = userId ? await checkIfQuoteIsLiked(quote?.id, userId) : false;

  return json({ quote, liked });
};

export async function action({ request, params }: ActionArgs) {
  const formData = await request.formData();
  const quoteId = formData.get("quoteId");
  if (quoteId && typeof quoteId === "string") {
    const userId = await getUserId(request);
    const quote = await getQuote(quoteId);
    invariant(quote, `Quote not found: ${params.id}`);
    invariant(userId, `UserId not found: ${request}`);
    return createOrDeleteQuotesUsers(quote?.id, userId);
  }
  Error("Invariant violation: quoteId is missing in form submit");
}

export const meta: V2_MetaFunction = () => [{ title: "Share your quote" }];

export default function Quote() {
  const user = useOptionalUser();
  const { quote, liked } = useLoaderData<typeof loader>();
  return <DisplayQuote {...quote} user={user} liked={liked} />;
}
