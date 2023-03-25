import type { ISvgIcon } from "./models/ISvgIcon";

export function CrossIcon({
  width,
  height,
  stroke,
  strokeWidth = 2,
}: ISvgIcon) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <path
        d="M16 16L8 8"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 8L8 16"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
