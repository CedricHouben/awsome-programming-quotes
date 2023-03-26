import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useRevalidator } from "@remix-run/react";
import invariant from "tiny-invariant";
import DisplayQuote from "~/components/DisplayQuote";
import { useOptionalUser } from "~/utils";
import { QuoteServer } from "~/models/quote.server";
import { commitSession, getSession, getUserId } from "~/session.server";
import {
  checkIfQuoteIsLiked,
} from "~/models/quote-user.server";
import { useEffect } from "react";
import AutoReload from "~/components/AutoReload";
import {
  handleLikeWithRedirect,
  handlePlayPause,
} from "~/helpers/action.helper";

export const loader = async ({ request }: LoaderArgs) => {
  const session = await getSession(request);
  const quoteId = session.get("quoteId") || null;
  const quoteServer = new QuoteServer();
  const quote = quoteId
    ? await quoteServer.getQuote(quoteId)
    : await quoteServer.getBiasedRandomQuote();
  const userId = await getUserId(request);
  invariant(quote, "Quote not found");
  const liked = userId ? await checkIfQuoteIsLiked(quote?.id, userId) : false;
  return json(
    { quote, liked },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
};

export async function action({ request, params }: ActionArgs) {
  const formData = await request.formData();
  const formAction = formData.get("fromAction");
  if (formAction === "like") {
    return handleLikeWithRedirect(formData, request, "/reload");
  }
  if (formAction === "pause") {
    return handlePlayPause(formData, request, "/");
  }
  Error("Invariant violation: fromAction unknown");
}

export const meta: V2_MetaFunction = () => [{ title: "A random quote" }];

export default function Reload() {
  const user = useOptionalUser();
  const { quote, liked } = useLoaderData<typeof loader>();

  const revalidator = useRevalidator();
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        revalidator.revalidate();
      }
    }, 5 * 1000);

    return () => clearInterval(interval);
  }, [revalidator]);

  return (
    <DisplayQuote {...quote} user={user} liked={liked}>
      <AutoReload play={false} quoteId={quote.id}></AutoReload>
    </DisplayQuote>
  );
}
