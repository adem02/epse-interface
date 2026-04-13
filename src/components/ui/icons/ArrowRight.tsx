import type { SVGProps } from "react";

type ArrowRightProps = SVGProps<SVGSVGElement> & {
  width?: number | string;
  height?: number | string;
  strokeWidth?: number | string;
};

export const ArrowRight = ({
  width = 14,
  height = 14,
  strokeWidth = 2.5,
  ...props
}: ArrowRightProps) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} {...props}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);