import type { V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import DisplayQuote from "~/components/DisplayQuote";

import { getRandomQuote } from "~/models/quote.server";
export const loader = async () => {
  const quote = await getRandomQuote();
  invariant(quote, "Quote not found");
  return json({ quote });
};

export const meta: V2_MetaFunction = () => [{ title: "A random quote" }];

export default function QuotePage() {
  const { quote } = useLoaderData<typeof loader>();
  return <DisplayQuote {...quote} />;
}
