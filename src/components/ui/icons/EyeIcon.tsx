import type { SVGProps } from "react";

type EyeIconProps = SVGProps<SVGSVGElement> & {
  width?: number | string;
  height?: number | string;
  strokeWidth?: number | string;
};

export const EyeIcon = ({
  width = 13,
  height = 13,
  strokeWidth = 2,
  ...props
}: EyeIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    {...props}
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
