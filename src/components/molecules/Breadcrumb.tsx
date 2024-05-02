"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const accountLinks = [
	{ name: "Dashboard", link: "" },
	{ name: "My Orders", link: "/orders" },
	{ name: "Transactions", link: "/transactions" },
	{ name: "Settings", link: "/settings" },
];

const Breadcrumb = () => {
	const pathname = usePathname();
	return (
		<div id="breadcrumbs" className="md:hidden w-full h-auto flex  items-center gap-4">
			{accountLinks.map((link, index) => (
				<React.Fragment key={index}>
					<Link
						href={`/account${link?.link}`}
						className={`font-medium ${pathname === `/account${link?.link}` ? "text-brown font-bold" : "hover:text-brown"} w-full text-[12px] md:text-md block}`}>
						{link.name}
					</Link>
					{index !== accountLinks?.length - 1 && <p>/</p>}
				</React.Fragment>
			))}
		</div>
	);
};

export default Breadcrumb;
