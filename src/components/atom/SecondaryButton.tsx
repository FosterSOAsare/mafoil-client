import React from "react";
import Link from "next/link";

type secondaryButtonType = {
	text: string;
	handleClick?: any;
	href?: any;
};

const SecondaryButton = ({ text, handleClick, href }: secondaryButtonType) => {
	return (
		<>
			{!href && (
				<button
					className="w-full h-12 border-black border-[1px] mb-4 text-black hover:bg-black hover:text-white"
					onClick={() => {
						if (handleClick) handleClick();
					}}>
					{text}
				</button>
			)}
			{href && (
				<Link href={href} className="w-full h-12 flex items-center justify-center hover:bg-black hover:text-white border-black mb-4 border-[1px] text-black">
					{text}
				</Link>
			)}
		</>
	);
};

export default SecondaryButton;
