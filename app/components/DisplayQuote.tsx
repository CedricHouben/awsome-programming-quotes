import type { User } from "@prisma/client";
import ShareDrawer from "~/components/ShareDrawer";
import ShareQuote from "~/components/ShareQuote";
import AuthenticationSection from "./AuthenticationSection";
import RateQuote from "./RateQuote";

export interface IDisplayQuoteProps {
  description: string;
  author: string;
  id: string;
  liked: boolean;
  user: User | undefined;
}
export default function DisplayQuote({
  author,
  description,
  id,
  liked,
  user,
}: IDisplayQuoteProps) {
  return (
    <main className="container mx-auto  h-full  px-8">
      <div className="flex h-full flex-col items-center justify-center">
        <h1
          className="mb-2 overflow-y-auto font-retro text-3xl"
          data-qa="displayQuote-quote-title"
        >
          {description}
          <span className="cursor">|</span>
        </h1>
        <h2 className="mb-4 font-retro text-2xl">{author}</h2>

        <ShareDrawer>
          <ShareQuote id={id} />
        </ShareDrawer>
        {user && <RateQuote liked={liked} quoteId={id} />}
        <AuthenticationSection user={user} />
      </div>
    </main>
  );
}
