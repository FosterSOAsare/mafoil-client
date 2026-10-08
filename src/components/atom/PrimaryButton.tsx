import Link from "next/link";
import React from "react";
import { Loading1 } from "./Loading";

type primaryButtonType = {
	text: string;
	handleClick?: any;
	href?: string;
	sx?: string;
	type?: "submit" | "button" | "reset" | undefined;
	disabled?: boolean;
};

// Solid primary style shared by every main call-to-action: black, brown on hover
const baseClasses = "w-full h-12 mb-4 flex items-center justify-center bg-black text-white text-sm font-medium uppercase tracking-[2px] transition-colors duration-200";

const PrimaryButton = ({ text, handleClick, href, sx = "", type = "button", disabled = false }: primaryButtonType) => {
	return (
		<>
			{!href && (
				<button
					type={type}
					className={`${baseClasses} ${disabled ? "opacity-60 cursor-not-allowed" : "hover:bg-brown"} ${sx}`}
					onClick={() => {
						if (handleClick) handleClick();
					}}
					disabled={disabled}>
					{disabled && <Loading1 />}
					{!disabled && text}
				</button>
			)}
			{href && (
				<Link href={href} className={`${baseClasses} hover:bg-brown ${sx}`}>
					{text}
				</Link>
			)}
		</>
	);
};

export default PrimaryButton;
