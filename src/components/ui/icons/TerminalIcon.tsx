import type { SVGProps } from "react";

type TerminalIconProps = SVGProps<SVGSVGElement> & {
  width?: number | string;
  height?: number | string;
  strokeWidth?: number | string;
};

export const TerminalIcon = ({
  width = 13,
  height = 13,
  strokeWidth = 2,
  ...props
}: TerminalIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    {...props}
  >
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);
