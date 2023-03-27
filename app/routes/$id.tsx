import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";

import { json } from "@remix-run/node";
import {
  useLoaderData,
} from "@remix-run/react";
import invariant from "tiny-invariant";
import DisplayQuote from "~/components/DisplayQuote";
import { handleLike } from "~/helpers/action.helper";
import { checkIfQuoteIsLiked } from "~/models/quote-user.server";
import { QuoteServer } from "~/models/quote.server";
import { getUserId } from "~/session.server";
import { useOptionalUser } from "~/utils";

export const loader = async ({ params, request }: LoaderArgs) => {
  invariant(params.id, `params.id is required`);
  const userId = await getUserId(request);
  const quoteServer = new QuoteServer();
  const quote = await quoteServer.getQuote(params.id);
  invariant(quote, `Quote not found: ${params.id}`);

  const liked = userId ? await checkIfQuoteIsLiked(quote?.id, userId) : false;

  return json({ quote, liked });
};

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  return await handleLike(formData, request);
}

export const meta: V2_MetaFunction = () => [{ title: "Share your quote" }];

export default function Quote() {
  const user = useOptionalUser();
  const { quote, liked } = useLoaderData<typeof loader>();
  return <DisplayQuote {...quote} user={user} liked={liked}></DisplayQuote>;
}
