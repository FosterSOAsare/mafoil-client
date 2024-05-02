import React from "react";
import Link from "next/link";

const Cookies = ({ setShowCookies }: { setShowCookies: React.Dispatch<React.SetStateAction<boolean>> }) => {
	const setCookie = (value: string) => {
		localStorage.setItem("cookies", value);
		setShowCookies(false);
	};
	return (
		<aside className="w-full h-16 shadow-2xl border-t-[1px] flex items-center justify-between px-5 bg-white fixed bottom-0 left-0">
			<p className="text-sm">
				This website uses cookies to ensure you get the best experience on our website.{" "}
				<Link href="/privacy" className="underline text-brown">
					Privacy Policy
				</Link>{" "}
			</p>

			<div className="flex items-center gap-4">
				<button className="underline text-brown" onClick={() => setCookie("rejected")}>
					Not agree
				</button>
				<button className="bg-sec p-2 px-8 text-white" onClick={() => setCookie("accepted")}>
					Agree
				</button>
			</div>
		</aside>
	);
};

export default Cookies;
