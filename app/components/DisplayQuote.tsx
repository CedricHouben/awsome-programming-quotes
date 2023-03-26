import type { User } from "@prisma/client";
import ShareDrawer from "~/components/ShareDrawer";
import ShareQuote from "~/components/ShareQuote";
import RateQuote from "./RateQuote";

export interface IDisplayQuoteProps {
  description: string;
  author: string;
  id: string;
  liked: boolean;
  user: User | undefined;
  children?: JSX.Element;
}
export default function DisplayQuote({
  author,
  description,
  id,
  liked,
  user,
  children,
}: IDisplayQuoteProps) {
  return (
    <main className="full-height-exc-navbar container mx-auto  px-8">
      <div className="flex h-full flex-col items-center justify-center">
        <h1
          className="mb-2 overflow-y-auto font-retro text-3xl"
          data-qa="displayQuote-quote-title"
        >
          {description}
          <span className="cursor">|</span>
        </h1>
        <h2 className="mb-4 font-retro text-2xl">{author}</h2>
        <div className="flex flex-row">
          <ShareDrawer>
            <ShareQuote id={id} />
          </ShareDrawer>
          {children}
        </div>

        {user && <RateQuote liked={liked} quoteId={id} />}
      </div>
    </main>
  );
}
