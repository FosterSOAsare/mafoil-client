import Link from "next/link";
import React from "react";

type primaryButtonType = {
	text: string;
	handleClick?: any;
	href?: string;
	sx?: string;
	type?: "submit" | "button" | "reset" | undefined;
	disabled?: boolean;
};

const PrimaryButton = ({ text, handleClick, href, sx = "", type = "button", disabled = false }: primaryButtonType) => {
	return (
		<>
			{!href && (
				<button
					type={type}
					className={`${sx} ${disabled ? "opacity-40" : "opacity-80 hover:opacity-100 hover:bg-brown"}  w-full h-12 bg-black mb-4  text-white`}
					onClick={() => {
						if (handleClick) handleClick();
					}}
					disabled={disabled}>
					{text}
				</button>
			)}
			{href && (
				<Link href={href} className={`${sx} hover:bg-brown w-full h-12 flex items-center justify-center bg-black mb-4 opacity-90 hover:opacity-100 text-white`}>
					{text}
				</Link>
			)}
		</>
	);
};

export default PrimaryButton;
