import type { SVGProps } from "react";

type ShieldIconProps = SVGProps<SVGSVGElement> & {
  width?: number | string;
  height?: number | string;
  strokeWidth?: string | number;
};

export const ShieldIcon = (
  { width = 12,
    height = 12,
    strokeWidth = 2,
    ...props
  }: ShieldIconProps
) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);