import type { ISvgIcon } from "./models/ISvgIcon";

export function PauseIcon({ width, height, stroke }: ISvgIcon) {
  return (
    <svg
      version="1.1"
      width={width}
      height={height}
      viewBox="0 0 512 512"
      data-qa="pauseIcon-icon-svg"
    >
      <path
        stroke={stroke}
        d="M64 64h160v384h-160zM288 64h160v384h-160z"
      ></path>
    </svg>
  );
}
