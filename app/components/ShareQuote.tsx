import { useState } from "react";
import { getHostname } from "~/helpers/share-quote.helper";
import PrimaryButton from "./PrimaryButton";

export interface IShareQuote {
  id: string;
}
export default function ShareQuote({ id }: IShareQuote) {
  const [copied, setCopied] = useState(false);
  function hostname(id: string) {
    return typeof document !== "undefined" ? getHostname(window, id) : "";
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => setCopied(true));
  }
  return (
    <div>
      <h2 className="mb-2 font-bold">Your link:</h2>
      <input
        className="mb-2 w-full py-2"
        type="text"
        disabled
        value={hostname(id)}
      />
      <PrimaryButton
        dataQa="shareQuote-copy-btn"
        className="mb-2"
        handleClick={() => copyToClipboard(hostname(id))}
      >
        Copy link
      </PrimaryButton>
      {copied && <p className="text-green-500">Link copied to clipboard</p>}
    </div>
  );
}
