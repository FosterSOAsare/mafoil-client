import React, { useEffect } from "react";
import Link from "next/link";

import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";

const phoneMenuLinks = [
	{
		name: "Home",
		link: "/",
	},
	{
		name: "SHOP",
		link: "/products",
	},
	{
		name: "Faq",
		link: "/faq",
	},
	{
		name: "About Us",
		link: "/about",
	},
	{
		name: "Account",
		link: "/account",
	},
	{
		name: "Cart",
		link: "/cart",
	},
];

const PhoneMenu = ({ setShowMenu }: { setShowMenu: React.Dispatch<React.SetStateAction<boolean>> }) => {
	const { pathname } = useRouter();

	return (
		<aside className="w-full h-screen flex flex-col  overflow-y-auto bg-white fixed top-0 left-0 p-4 md:hidden z-[10]">
			<div className="flex items-center sticky bg-white top-0 left-0 z-[10]">
				<Link href="/" className="lg:hidden font-playfair text-3xl font-medium">
					Mafo.il
				</Link>
				<button className="w-10 h-10 bg-black text-white hover:bg-brown flex items-center justify-center ml-auto" onClick={() => setShowMenu(false)}>
					<AiOutlineClose className="text-2xl" />
				</button>
			</div>

			<nav className="text-black mt-6 w-auto gap-2 flex flex-col items-start justify-between">
				{phoneMenuLinks.map((link, index) => (
					<Link
						href={link?.link}
						onClick={() => {
							if (pathname === link.link) return;
							setShowMenu(false);
						}}
						key={index}
						className={`uppercase w-full py-4 text-sm font-medium ${pathname === link.link ? "bg-brown text-white" : " hover:bg-brown hover:text-white"} px-4`}>
						{link?.name}
					</Link>
				))}
			</nav>
		</aside>
	);
};

export default PhoneMenu;
