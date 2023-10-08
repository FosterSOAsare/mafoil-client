import { useRouter } from "next/router";
import React, { useMemo, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

import { cartItemType, useCartSelector } from "@/slices/cart.slice";
import { useWishListSelector } from "@/slices/wishlist.slice";
import { useUserSlice } from "@/slices/user.slice";
import { notificationType, useNotificationsSelector } from "@/slices/notifications.slice";

import CartPreview from "./CartPreview";
import AccountComponent from "../AccountComponent";
import Notifications from "./Notifications";

import { AiOutlinePhone, AiOutlineUser, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineBell } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";

const Header = () => {
	const cart = useSelector(useCartSelector);
	const { user } = useSelector(useUserSlice);
	const notifications = useSelector(useNotificationsSelector);
	const wishList = useSelector(useWishListSelector);
	const [showAccountMenuComponent, setShowAccountMenuComponent] = useState(false);
	const [showNotifications, setShowNotifications] = useState(false);
	const accountMenuComponentParentRef = useRef<any>(null);
	const { pathname } = useRouter();

	const cartItemsCount = useMemo(() => {
		if (cart?.length === 0) return 0;
		return cart.reduce((total: number, item: cartItemType) => total + item?.count, 0);
	}, [cart]);

	useEffect(() => {
		function checkClick(e: any) {
			const parent = accountMenuComponentParentRef?.current;
			setShowAccountMenuComponent(parent.contains(e.target));
		}

		window.addEventListener("click", checkClick);
		return () => {
			window.removeEventListener("click", checkClick);
		};
	}, []);

	const [showCart, setShowCart] = useState(false);

	function openCart() {
		if (pathname.toLowerCase() === "/cart") return;
		setShowCart(true);
	}

	const unreadNotificationsCount = useMemo(() => {
		let unread = notifications.filter((n: notificationType) => n.status === "unread");
		return unread?.length;
	}, [notifications]);

	return (
		<header className="w-full bg-white shadow-md sticky top-0 left-0 z-[6] h-20 flex items-center justify-between px-10">
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
				<Link href="/faq" className="text-sm font-medium hover:text-brown">
					FAQ
				</Link>
				<Link href="/" className="text-sm font-medium hover:text-brown">
					ABOUT US
				</Link>
			</nav>
			<div className="flex items-center gap-4 text-2xl h-12 font-thin">
				<BiSearch className="hover:cursor-pointer" />
				<div className="relative" ref={accountMenuComponentParentRef}>
					<button className="w-full block" onClick={() => setShowAccountMenuComponent(true)}>
						<AiOutlineUser className="hover:cursor-pointer" />
					</button>
					{showAccountMenuComponent && <AccountComponent />}
				</div>
				{user?._id && (
					<>
						<Link href="/wishlist" className="relative">
							<AiOutlineHeart className="hover:cursor-pointer" />
							<span className={`w-5 h-5 flex items-center justify-center bg-brown text-white absolute rounded-full text-[10px] font-bold -right-3 -top-2`}>
								{wishList?.length > 9 ? "9+" : wishList?.length}
							</span>
						</Link>
						<button className="relative" onClick={() => setShowNotifications(true)}>
							<AiOutlineBell className="hover:cursor-pointer" />
							<span className={`w-5 h-5 flex items-center justify-center bg-brown text-white absolute rounded-full text-[10px] font-bold -right-3 -top-2`}>
								{unreadNotificationsCount > 9 ? "9+" : unreadNotificationsCount}
							</span>
						</button>
						<button className="relative" onClick={() => openCart()}>
							<AiOutlineShoppingCart className="hover:cursor-pointer" />
							<span className={`w-5 h-5 flex items-center justify-center bg-brown text-white absolute rounded-full text-[10px] font-bold -right-3 -top-2`}>
								{cartItemsCount > 9 ? "9+" : cartItemsCount}
							</span>
						</button>
					</>
				)}
			</div>

			{showCart && <CartPreview setShowCart={setShowCart} />}

			{showNotifications && <Notifications setShowNotifications={setShowNotifications} />}
		</header>
	);
};

export default Header;
