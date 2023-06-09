import type { ISvgIcon } from "./models";

export function QuoteIcon({ width, height, fill }: ISvgIcon) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 416 448"
    >
      <path
        fill={fill}
        d="M192 240v96c0 26.5-21.5 48-48 48h-96c-26.5 0-48-21.5-48-48v-176c0-70.5 57.5-128 128-128h16c8.75 0 16 7.25 16 16v32c0 8.75-7.25 16-16 16h-16c-35.25 0-64 28.75-64 64v8c0 13.25 10.75 24 24 24h56c26.5 0 48 21.5 48 48zM416 240v96c0 26.5-21.5 48-48 48h-96c-26.5 0-48-21.5-48-48v-176c0-70.5 57.5-128 128-128h16c8.75 0 16 7.25 16 16v32c0 8.75-7.25 16-16 16h-16c-35.25 0-64 28.75-64 64v8c0 13.25 10.75 24 24 24h56c26.5 0 48 21.5 48 48z"
      ></path>
    </svg>
  );
}
