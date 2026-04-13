import type { SVGProps } from "react";

type ConfigIconProps = SVGProps<SVGSVGElement> & {
  width?: number | string;
  height?: number | string;
  strokeWidth?: number | string;
};

export const ConfigIcon = ({
  width = 20,
  height = 20,
  strokeWidth = 1.5,
  ...props
}: ConfigIconProps) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} {...props}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.07 4.93l-1.41 1.41M5.34 18.66l-1.41 1.41M21 12h-2M5 12H3M19.07 19.07l-1.41-1.41M5.34 5.34L3.93 3.93M12 21v-2M12 5V3" />
  </svg>
);