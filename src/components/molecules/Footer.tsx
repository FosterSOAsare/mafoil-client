import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

import { useUserSlice } from "@/slices/user.slice";

import { FiMail } from "react-icons/fi";

const Footer = () => {
	const { user } = useSelector(useUserSlice);
	function registerNewsLetter(e: any) {
		e.preventDefault();
		console.log("dead");
	}
	return (
		<footer className="w-full h-auto flex items-center justify-center flex-col bg-[#F8F5F4] py-24 px-10">
			<h3 className="text-4xl font-playfair mb-12">Mafo.il</h3>
			<div className="w-full h-48 mb-6 flex items-start justify-between">
				<div className="w-1/4">
					<p>+866.597.2742</p>
					<p>support@mafoilcom</p>
				</div>
				<article className="w-1/2 flex items-start justify-start">
					<div className="w-1/2">
						<h3 className="uppercase mb-6 font-medium">Account</h3>
						<nav className=" ">
							<Link href="/" className="block hover:underline text-black hover:text-brown text-sm mb-2">
								Profile
							</Link>
							<Link href="/" className="block hover:underline text-black hover:text-brown text-sm mb-2">
								Products
							</Link>
							<Link href="/" className="block hover:underline text-black hover:text-brown text-sm mb-2 ">
								Cart
							</Link>
							<Link href="/" className="block hover:underline text-black hover:text-brown text-sm mb-2">
								Wish List
							</Link>
						</nav>
					</div>
					<div className="w-1/2">
						<h3 className="uppercase mb-6 font-medium">HELP</h3>
						<nav className="text-black hover:text-brown">
							<Link href="/" className="block hover:underline text-black hover:text-brown text-sm mb-2">
								FAQ
							</Link>
							<Link href="/" className="block hover:underline text-black hover:text-brown text-sm mb-2">
								Terms and conditions
							</Link>
							<Link href="/" className="block hover:underline text-black hover:text-brown text-sm mb-2">
								Contact
							</Link>
							<Link href="/" className="block hover:underline text-black hover:text-brown text-sm mb-2">
								About us
							</Link>
						</nav>
					</div>
				</article>
				<div className="w-1/4">
					<h3 className="uppercase mb-6 font-medium">Newsletter</h3>
					<p>New subscribers receive 10% off their first purchase</p>

					{!user?.subscribed && (
						<div className="w-full h-8 mt-6 border-b-[2px] border-black gap-4 flex items-center justify-between">
							<form action="" onSubmit={registerNewsLetter} className="w-full">
								<input type="text" className="w-full h-full  bg-transparent focus:outline-0" placeholder="Your email" />
							</form>
							<FiMail />
						</div>
					)}

					{user?.subscribed && <div className="w-full h-8 mt-6 border-b-[2px] bg-[#D4EDDA] text-[#155724] p-4 py-6 gap-4 flex items-center justify-between">Thanks for subscribing</div>}
				</div>
			</div>
			<p className="text-sm">© 2023 - Shopify By Wpbingo</p>
		</footer>
	);
};

export default Footer;
