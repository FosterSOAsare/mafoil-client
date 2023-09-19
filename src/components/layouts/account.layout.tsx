import React, { ReactNode } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

import { useUserSlice } from "@/slices/user.slice";

import Header from "../molecules/Header";
import Footer from "../molecules/Footer";
import ProtectedRoute from "../ProtectedRoute";

const AccountLayout = ({ children, active, title }: { children: ReactNode; active: string; title: string }) => {
	const { user } = useSelector(useUserSlice);
	return (
		<ProtectedRoute loginRequired={true}>
			<Header />
			<div className="w-full max-w-7xl mx-auto flex items-center justify-end h-12">
				<Link href="/account/transactions" className="font-medium hover:text-brown">
					Balance : <span className="font-bold">GH₵{(user?.balance || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
				</Link>
			</div>
			<h3 className="text-5xl font-bold text-center mt-16 mb-8">{title}</h3>
			<div className="w-full flex gap-8 items-center min-h-[50vh] justify-between max-w-7xl mx-auto">
				<div className="w-1/4 h-auto bg-slate-200 flex flex-col">
					<Link href="/account" className={`w-full ${active === "dashboard" ? "bg-brown text-white" : "text-black bg-transparent border-black hover:text-brown"} p-3 border-b-[1px]`}>
						Dashboard
					</Link>
					<Link href="/account/orders" className={`w-full ${active === "orders" ? "bg-brown text-white" : "text-black bg-transparent border-black hover:text-brown"} p-3 border-b-[1px]`}>
						My Orders
					</Link>
					<Link
						href="/account/transactions"
						className={`w-full ${active === "transactions" ? "bg-brown text-white" : "text-black bg-transparent border-black hover:text-brown"} p-3 border-b-[1px]`}>
						Transactions
					</Link>
					<Link href="/account/settings" className={`w-full ${active === "settings" ? "bg-brown text-white" : "text-black bg-transparent hover:text-brown"} p-3 border-b-[1px]`}>
						Settings
					</Link>
				</div>
				<div className="w-[70%]">{children}</div>
			</div>
			<Footer />
		</ProtectedRoute>
	);
};

export default AccountLayout;
