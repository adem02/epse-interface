import type { SVGProps } from "react";

type InfoIconProps = SVGProps<SVGSVGElement> & {
  width?: number | string;
  height?: number | string;
  strokeWidth?: number | string;
};

export const InfoIcon = ({
  width = 13,
  height = 13,
  strokeWidth = 2,
  ...props
}: InfoIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
