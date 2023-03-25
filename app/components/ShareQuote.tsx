import { useState } from "react";
import PrimaryButton from "./PrimaryButton";

export interface IButtonProps {
  id: string;
}
export default function ShareQuote({ id }: IButtonProps) {
  const [copied, setCopied] = useState(false);
  function hostname() {
    return typeof document !== "undefined"
      ? (window as Window).location.href
      : null;
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
        value={hostname() + id}
      />
      <PrimaryButton
        className="mb-2 "
        handleClick={() => copyToClipboard(hostname() + id)}
      >
        Copy link
      </PrimaryButton>
      {copied && <p>Link successfully copied to clipboard</p>}
    </div>
  );
}
