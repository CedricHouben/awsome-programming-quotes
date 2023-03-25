import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
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
  return (
    <main className="container mx-auto  h-full px-8">
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="font-retro text-3xl">
          {quote.description}
          <span className="cursor">|</span>
        </h1>
        <h2 className="pt-2 font-retro text-2xl">{quote.author}</h2>
      </div>
    </main>
  );
}
