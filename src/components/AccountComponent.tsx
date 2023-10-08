import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useUserSlice } from "@/slices/user.slice";
import useLogoutUser from "@/hooks/useLogoutUser";

const AccountComponent = () => {
	const { user } = useSelector(useUserSlice);
	const logout = useLogoutUser();

	return (
		<aside className="absolute top-[105%] right-[00%] bg-white shadow-md w-[170px] h-auto py-2">
			{user?._id && (
				<>
					<div className="border-b-[1px] pb-2 px-4">
						<p className="text-[12px]">
							Hello{" "}
							<Link href="/account" className="text-sm text-brown underline">
								{user?.fullname}
							</Link>
						</p>
					</div>
					{user?.is_admin && (
						<Link href="/admin" className="block px-4 pt-2 p-[4px] text-sm text-black hover:text-brown">
							Admin
						</Link>
					)}
					<Link href="/account/transactions" className="block px-4 pt-2 p-[4px] text-sm text-black hover:text-brown">
						Transactions
					</Link>
					<Link href="/account/orders" className="block px-4 p-[4px] text-sm text-black hover:text-brown">
						My Orders
					</Link>
					<Link href="/account/settings" className="block px-4 p-[4px] text-sm text-black hover:text-brown">
						Settings
					</Link>
					<button className="block px-4 p-[4px] text-sm text-black hover:text-[red]" onClick={() => logout()}>
						Signout
					</button>
				</>
			)}
			{!user?._id && (
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
