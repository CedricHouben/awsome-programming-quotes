import { Form } from "@remix-run/react";
import colors from "~/theme/colors";
import { PlayIcon, PauseIcon } from "./icons";
export interface IAutoReloadProps {
  play: boolean;
  quoteId: string;
}

export default function AutoReload({ play, quoteId }: IAutoReloadProps) {
  return (
    <Form method="post">
      <input type="hidden" name="fromAction" value={play ? "play" : "pause"} />
      <input type="hidden" name="quoteId" value={quoteId} />
      <button
        type="submit"
        className={`ml-2 box-border flex w-24 justify-center border-2 border-black  py-3 px-6 hover:bg-gray-200 active:border-4 active:bg-gray-200 active:py-[10px] active:px-[22px]`}
      >
        {play ? (
          <PlayIcon height={24} width={24} fill={colors.black} />
        ) : (
          <PauseIcon height={24} width={24} fill={colors.black} />
        )}
      </button>
    </Form>
  );
}
