import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

import { cartItemType, useCartSelector } from "@/slices/cart.slice";

import CartPreview from "./CartPreview";

import { AiOutlinePhone, AiOutlineUser, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";

const Header = () => {
	const cart = useSelector(useCartSelector);

	const cartItemsCount = useMemo(() => {
		if (cart?.length === 0) return 0;
		return cart.reduce((total: number, item: cartItemType) => total + item?.count, 0);
	}, [cart]);

	const [showCart, setShowCart] = useState(false);
	return (
		<header className="w-full bg-white shadow-md sticky top-0 left-0 z-[4] h-20 flex items-center justify-between px-10">
			<Link href="tel:+8665972742" className="flex items-center text-sm gap-2 group font-medium">
				<div className="w-10 h-10 rounded-full border-[1px] group-hover:bg-brown group-hover:text-white flex items-center justify-center">
					<AiOutlinePhone className="text-xl rotate-90" />
				</div>
				<p className="group-hover:text-brown">+866.597.2742</p>
			</Link>
			<nav className="w-auto gap-10 flex items-center justify-between">
				<Link href="/" className="text-sm font-medium hover:text-brown">
					HOME
				</Link>
				<Link href="/products" className="text-sm font-medium hover:text-brown">
					SHOP
				</Link>
				<Link href="/" className="font-playfair px-4 text-4xl font-medium">
					Mafo.il
				</Link>
				<Link href="/" className="text-sm font-medium hover:text-brown">
					BLOG
				</Link>
				<Link href="/" className="text-sm font-medium hover:text-brown">
					ABOUT US
				</Link>
			</nav>
			<div className="flex items-center gap-4 text-2xl h-12 font-thin">
				<BiSearch className="hover:cursor-pointer" />
				<AiOutlineUser className="hover:cursor-pointer" />
				<div className="relative">
					<AiOutlineHeart className="hover:cursor-pointer" />
					<span className={`w-5 h-5 flex items-center justify-center bg-brown text-white absolute rounded-full text-[10px] font-bold -right-3 -top-2`}>9</span>
				</div>
				<button className="relative" onClick={() => setShowCart(true)}>
					<AiOutlineShoppingCart className="hover:cursor-pointer" />
					<span className={`w-5 h-5 flex items-center justify-center bg-brown text-white absolute rounded-full text-[10px] font-bold -right-3 -top-2`}>
						{cartItemsCount > 9 ? "9+" : cartItemsCount}
					</span>
				</button>
			</div>

			{showCart && <CartPreview setShowCart={setShowCart} />}
		</header>
	);
};

export default Header;
