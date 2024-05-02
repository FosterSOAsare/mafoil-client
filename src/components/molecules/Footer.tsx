import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { setData, useUserSlice } from "@/slices/user.slice";

import { FiMail } from "react-icons/fi";
import { useModerateNewsletterSubscriptionMutation } from "@/apis/newsletterApi";
import PrimaryButton from "../atom/PrimaryButton";

const Footer = () => {
	const { user } = useSelector(useUserSlice);
	const dispatch = useDispatch();
	const [moderateNewsletterSubscription, { data, error, isLoading }]: any = useModerateNewsletterSubscriptionMutation();

	const [email, setEmail] = useState(user?.email || "");

	useEffect(() => {
		if (!user?.email) return;
		setEmail(user?.email);
	}, [user?.email]);

	function registerNewsLetter(e: any) {
		e.preventDefault();
		if (!email) return;
		moderateNewsletterSubscription({ email });
	}
	useEffect(() => {
		if (!data) return;
		toast.success("Newsletter subscription was successful", { autoClose: 1500 });
		setEmail("");
		if (email === user?.email) dispatch(setData({ subscribed: true }));
	}, [data]);

	useEffect(() => {
		if (!error) return;
		toast.error(error?.data?.error, { autoClose: 1500 });
	}, [error]);
	return (
		<footer className="w-full h-auto flex items-center justify-center flex-col bg-[#F8F5F4] py-12 md:py-24 px-4 md:px-10">
			<h3 className="text-4xl font-playfair mr-auto md:mx-auto mb-12">Mafo.il</h3>
			<div className="w-full h-auto md:h-48 mb-6 flex flex-col md:flex-row items-start justify-between">
				<div className="w-full md:w-1/4">
					<p>+233.550.529.015</p>
					<p>support@mafoil.com</p>
				</div>
				<article className="w-full md:w-1/2 flex mt-6 md:mt-0 items-start justify-start">
					<div className="w-1/2">
						<h3 className="uppercase mb-6 font-medium">Account</h3>
						<nav className=" ">
							<Link href="/account" className="block hover:underline text-black hover:text-brown text-sm mb-2">
								Profile
							</Link>
							<Link href="/products" className="block hover:underline text-black hover:text-brown text-sm mb-2">
								Products
							</Link>
							<Link href="/cart" className="block hover:underline text-black hover:text-brown text-sm mb-2 ">
								Cart
							</Link>
							<Link href="/wishlist" className="block hover:underline text-black hover:text-brown text-sm mb-2">
								Wish List
							</Link>
						</nav>
					</div>
					<div className="w-1/2">
						<h3 className="uppercase mb-6 font-medium">HELP</h3>
						<nav className="text-black hover:text-brown">
							<Link href="/faq" className="block hover:underline text-black hover:text-brown text-sm mb-2">
								FAQ
							</Link>
							<Link href="/tcs" className="block hover:underline text-black hover:text-brown text-sm mb-2">
								Terms and conditions
							</Link>
							<Link href="/privacy" className="block hover:underline text-black hover:text-brown text-sm mb-2">
								Privacy Policy
							</Link>
							<Link href="/contact" className="block hover:underline text-black hover:text-brown text-sm mb-2">
								Contact
							</Link>
						</nav>
					</div>
				</article>
				<div className="w-full md:w-1/4 mt-6 md:mt-0">
					<h3 className="uppercase mb-6 font-medium">Newsletter</h3>
					<p>New subscribers receive 10% off their first purchase</p>

					{!user?.subscribed && (
						<>
							<form action="" onSubmit={registerNewsLetter} className="w-full">
								<div className="w-full h-auto mt-6 border-b-[2px] border-black gap-4 flex items-center justify-between">
									<input type="text" value={email} className="w-full h-full  bg-transparent focus:outline-0" placeholder="Your email" onChange={(e) => setEmail(e.target.value)} />
									<FiMail />
								</div>
								<PrimaryButton text="Register" sx="!mt-3" type="submit" disabled={isLoading} />
							</form>
						</>
					)}

					{user?.subscribed && <div className="w-full h-8 mt-6 border-b-[2px] bg-[#D4EDDA] text-[#155724] p-4 py-6 gap-4 flex items-center justify-between">Thanks for subscribing</div>}
				</div>
			</div>
			<p className="text-sm">© {new Date().getFullYear()} - Shopify By Scholar </p>
		</footer>
	);
};

export default Footer;
