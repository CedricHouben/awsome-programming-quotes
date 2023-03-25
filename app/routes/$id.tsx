import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import DisplayQuote from "~/components/DisplayQuote";
import { getQuote } from "~/models/quote.server";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.id, `params.id is required`);

  const quote = await getQuote(params.id);
  invariant(quote, `Quote not found: ${params.id}`);

  return json({ quote });
};

export const meta: V2_MetaFunction = () => [{ title: "Your awsome quote" }];

export default function Quote() {
  const { quote } = useLoaderData<typeof loader>();
  return <DisplayQuote {...quote} />;
}
