import { Form } from "@remix-run/react";
import { LikeIcon, LikeIconActive } from "./icons";

export interface IRateQuoteProps {
  liked: boolean;
  quoteId: string;
}
export default function RateQuote({ liked, quoteId }: IRateQuoteProps) {
  return (
    <Form method="post" className="mt-4">
      <input type="hidden" name="fromAction" value="like" />
      <input type="hidden" name="quoteId" value={quoteId} />
      <button type="submit">{liked ? <LikeIconActive /> : <LikeIcon />}</button>
    </Form>
  );
}
