import { Quote } from "@prisma/client";
import type { V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import ShareDrawer from "~/components/ShareDrawer";
import ShareQuote from "~/components/ShareQuote";
import { getRandomQuote } from "~/models/quote.server";

export const loader = async () => {
  const quote = await getRandomQuote();
  invariant(quote, "Quote not found");
  return json({ quote });
};

export const meta: V2_MetaFunction = () => [{ title: "Your awsome quote" }];

export default function Quote() {
  const { quote } = useLoaderData<typeof loader>();
  return (
    <main className="container mx-auto  h-full  px-8">
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="mb-2 overflow-y-auto font-retro text-3xl">
          {quote.description}
          <span className="cursor">|</span>
        </h1>
        <h2 className="mb-4 font-retro text-2xl">{quote.author}</h2>

        <ShareDrawer>
          <ShareQuote id={quote.id} />
        </ShareDrawer>
      </div>
    </main>
  );
}
