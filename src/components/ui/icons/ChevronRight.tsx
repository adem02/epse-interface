import type { SVGProps } from "react";

type ChevronRightProps = SVGProps<SVGSVGElement> & {
	width?: number | string;
	height?: number | string;
	strokeWidth?: number | string;
};

export const ChevronRight = ({
	width = 10,
	height = 10,
	strokeWidth = 2,
	...props
}: ChevronRightProps) => (
	<svg
		width={width}
		height={height}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth={strokeWidth}
		{...props}
	>
		<polyline points="9 18 15 12 9 6" />
	</svg>
);
