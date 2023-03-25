import { json, V2_MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getRandomQuote } from "~/models/quote.server";

export const loader = async () => {
  return json({ quote: await getRandomQuote() });
};

export const meta: V2_MetaFunction = () => [{ title: "Your awsome quote" }];

export default function Posts() {
  const { quote } = useLoaderData<typeof loader>();
  if (!quote) {
    return <p>Quote not found</p>;
  }
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
