import { useState } from "react";
import colors from "~/theme/colors";
import { CrossIcon } from "./icons";
import PrimaryButton from "./PrimaryButton";

export interface IShareDrawer {
  children: JSX.Element;
}
export default function Drawer({ children }: IShareDrawer) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <PrimaryButton
        handleClick={() => setIsOpen(!isOpen)}
        dataQa="shareDrawer-share-btn"
      >
        Share
      </PrimaryButton>

      <>
        {isOpen && (
          <div
            className=" fixed top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.75)]"
            onClick={() => setIsOpen(!isOpen)}
          ></div>
        )}
        <div
          className={`slide-right fixed top-0 flex h-full w-full flex-col bg-white px-10 py-10 md:w-[500px] ${
            isOpen && "slide-right--visable"
          }`}
        >
          <button
            className="flex h-9 w-9 items-center justify-center self-end"
            onClick={() => setIsOpen(!isOpen)}
          >
            <CrossIcon height={36} width={36} stroke={colors.black} />
          </button>
          <div> {children}</div>
        </div>
      </>
    </div>
  );
}
