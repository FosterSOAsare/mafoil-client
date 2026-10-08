import React from "react";
import Link from "next/link";

type secondaryButtonType = {
	text: string;
	handleClick?: any;
	href?: any;
	disabled?: boolean;
	sx?: string;
};

// Outlined secondary style that pairs with PrimaryButton
const baseClasses =
	"w-full h-12 mb-4 flex items-center justify-center border border-black text-black text-sm font-medium uppercase tracking-[2px] transition-colors duration-200 hover:bg-black hover:text-white";

const SecondaryButton = ({ text, handleClick, href, disabled = false, sx = "" }: secondaryButtonType) => {
	return (
		<>
			{!href && (
				<button
					className={`${baseClasses} ${disabled ? "opacity-60 cursor-not-allowed" : ""} ${sx}`}
					onClick={() => {
						if (handleClick) handleClick();
					}}
					type="button"
					disabled={disabled}>
					{text}
				</button>
			)}
			{href && (
				<Link href={href} className={`${baseClasses} ${sx}`}>
					{text}
				</Link>
			)}
		</>
	);
};

export default SecondaryButton;
