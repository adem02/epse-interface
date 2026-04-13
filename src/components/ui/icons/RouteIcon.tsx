import type { SVGProps } from "react";

type RouteIconProps = SVGProps<SVGSVGElement> & {
  width?: number | string;
  height?: number | string;
  strokeWidth?: string | number;
};

export const RouteIcon = ({
  width = 20,
  height = 20,
  strokeWidth = 1.5,
  ...props
}: RouteIconProps) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="5" cy="6" r="3" />
    <circle cx="19" cy="18" r="3" />
    <path d="M5 9a12 12 0 0 0 0 6" />
    <path d="M8 6h4a4 4 0 0 1 4 4v1" />
  </svg>
);