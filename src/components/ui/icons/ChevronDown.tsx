import type { SVGProps } from "react";

type ChevronDownProps = SVGProps<SVGSVGElement> & {
	width?: number | string;
	height?: number | string;
	strokeWidth?: number | string;
};

export const ChevronDown = ({
	width = 12,
	height = 12,
	strokeWidth = 2,
	...props
}: ChevronDownProps) => (
	<svg
		width={width}
		height={height}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth={strokeWidth}
		{...props}
	>
		<polyline points="6 9 12 15 18 9" />
	</svg>
);
