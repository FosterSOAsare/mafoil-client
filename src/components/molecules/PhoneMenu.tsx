import React, { useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

import { useUserSlice } from "@/slices/user.slice";

import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";
import useLogoutUser from "@/hooks/useLogoutUser";

const phoneMenuLinks = [
	{
		name: "Home",
		link: "/",
		isDefault: true,
	},
	{
		name: "SHOP",
		link: "/products",
		isDefault: true,
	},
	{
		name: "Faq",
		link: "/faq",
		isDefault: true,
	},
	// {
	// 	name: "About Us",
	// 	link: "/about",
	// 	isDefault: true,
	// },
	{
		name: "Contact Us",
		link: "/contact",
		isDefault: true,
	},
	{
		name: "Register",
		link: "/auth/register",
		loginRequired: false,
	},
	{
		name: "Login in",
		link: "/auth/login",
		loginRequired: false,
	},
	{
		name: "Account",
		link: "/account",
		loginRequired: true,
	},
	{
		name: "Wishlist",
		link: "/wishlist",
		loginRequired: true,
	},
	{
		name: "Cart",
		link: "/cart",
		loginRequired: true,
	},
];

const PhoneMenu = ({ setShowMenu }: { setShowMenu: React.Dispatch<React.SetStateAction<boolean>> }) => {
	const { pathname } = useRouter();
	const { user } = useSelector(useUserSlice);
	const logout = useLogoutUser();

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
					<>
						{(link.isDefault || (user?._id && link?.loginRequired) || (!user?._id && !link?.loginRequired)) && (
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
						)}
					</>
				))}

				{user?._id && (
					<button onClick={() => logout()} className={`uppercase w-full py-4 text-left text-sm font-medium hover:bg-slate-200 text-red-500 px-4`}>
						Sign out
					</button>
				)}
			</nav>
		</aside>
	);
};

export default PhoneMenu;
