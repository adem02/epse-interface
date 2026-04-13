import type { SVGProps } from "react";

type GridIconProps = SVGProps<SVGSVGElement> & {
  width?: number | string;
  height?: number | string;
  strokeWidth?: number | string;
};

export const GridIcon = ({
  width = 13,
  height = 13,
  strokeWidth = 2,
  ...props
}: GridIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    {...props}
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </svg>
);
