import React, { ReactNode } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import { useUserSlice } from "@/slices/user.slice";

import Header from "../molecules/Header";
import Footer from "../molecules/Footer";
import ProtectedRoute from "../ProtectedRoute";
import { useRouter } from "next/router";
import Breadcrumb from "../molecules/Breadcrumb";

export const accountLinks = [
	{ name: "Dashboard", link: "" },
	{ name: "My Orders", link: "/orders" },
	{ name: "Transactions", link: "/transactions" },
	{ name: "Settings", link: "/settings" },
];

const AccountLayout = ({ children, title }: { children: ReactNode; title: string }) => {
	const { user } = useSelector(useUserSlice);
	const { pathname } = useRouter();
	return (
		<>
			<Header />
			<div className="w-full max-w-7xl mx-auto flex px-4 text-sm md:text-[16px] items-center justify-end h-12">
				<Link href="/account/transactions" className="font-medium hover:text-brown">
					Balance : <span className="font-bold">GH₵{(user?.balance || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
				</Link>
			</div>
			<h3 className="text-2xl md:text-4xl font-bold text-center mt-6 md:mt-16 mb-8">{title}</h3>
			<div className="w-full flex flex-col md:flex-row gap-4 md:gap-8 items-start md:min-h-[50vh] justify-between max-w-7xl mx-auto">
				<div className="hidden w-1/4 h-auto bg-slate-200 md:flex flex-col">
					{accountLinks.map((link, index) => (
						<Link
							href={`/account${link?.link}`}
							key={index}
							className={`w-full ${
								pathname === `/account${link?.link}` ? "bg-brown text-white" : index !== accountLinks.length - 1 ? "border-black" : "text-black bg-transparent hover:text-brown"
							} p-3 border-b`}>
							{link?.name}
						</Link>
					))}
				</div>
				<div className="px-4 w-full md:hidden">
					<Breadcrumb />
				</div>
				<div className="w-full md:w-[70%] px-4 md:px-0">{children}</div>
				<ToastContainer />
			</div>
			<Footer />
		</>
	);
};

const index = ({ children, active, title }: { children: ReactNode; active?: string; title: string }) => {
	return (
		<ProtectedRoute loginRequired={true}>
			<AccountLayout title={title}>{children}</AccountLayout>
		</ProtectedRoute>
	);
};

export default index;
