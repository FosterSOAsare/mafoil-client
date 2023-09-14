import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useUserSlice } from "@/slices/user.slice";

const AccountComponent = () => {
	const { user } = useSelector(useUserSlice);

	return (
		<aside className="absolute top-[105%] right-[00%] bg-white shadow-md w-[170px] h-auto py-2">
			{user?.id && (
				<>
					<p className="text-[12px] border-b-[1px] pb-2 px-4">
						Hello{" "}
						<Link href="/account" className="text-sm text-brown underline">
							Foster Asare
						</Link>
					</p>

					<Link href="/account/transactions" className="block px-4 pt-2 p-[4px] text-sm text-black hover:text-brown">
						Transactions
					</Link>
					<Link href="/account/orders" className="block px-4 p-[4px] text-sm text-black hover:text-brown">
						My Orders
					</Link>
					<Link href="/account/settings" className="block px-4 p-[4px] text-sm text-black hover:text-brown">
						Settings
					</Link>
					<button className="block px-4 p-[4px] text-sm text-black hover:text-[red]">Signout</button>
				</>
			)}
			{!user?.id && (
				<>
					<p className="text-sm border-b-[1px] pb-2 px-4">Welcome to Mafo.il</p>

					<Link href="/auth/register" className="block px-4 pt-2 p-[4px] text-sm text-black hover:text-brown">
						Sign up
					</Link>
					<Link href="/auth/login" className="block px-4 p-[4px] text-sm text-black hover:text-brown">
						Log in
					</Link>
				</>
			)}
		</aside>
	);
};

export default AccountComponent;
