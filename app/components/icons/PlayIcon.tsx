import type { ISvgIcon } from "./models/ISvgIcon";

export function PlayIcon({ width, height, stroke }: ISvgIcon) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 512 512"
    >
      <path stroke={stroke} d="M96 64l320 192-320 192z"></path>
    </svg>
  );
}
