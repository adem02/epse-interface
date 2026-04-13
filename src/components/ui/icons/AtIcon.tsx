import type { SVGProps } from "react";

type AtIconProps = SVGProps<SVGSVGElement> & {
  width?: number | string;
  height?: number | string;
  strokeWidth?: number | string;
};

export const AtIcon = ({
  width = 14,
  height = 14,
  strokeWidth = 2,
  ...props
}: AtIconProps) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
    </svg>
  );
};