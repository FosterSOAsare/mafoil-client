import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { setData, useUserSlice } from "@/slices/user.slice";

import AccountLayout from "@/components/layouts/account.layout";
import { useLazyActivateUserAccountRequestQuery } from "@/apis/userApi";

const index = () => {
	const { user } = useSelector(useUserSlice);
	const dispatch = useDispatch();

	const [activateUserAccount, { data, error, isLoading }]: any = useLazyActivateUserAccountRequestQuery();

	useEffect(() => {
		if (!data) return;
		toast.success("Account has been successfully activated", { autoClose: 1500 });

		setTimeout(() => {
			dispatch(setData({ accountVerified: true, balance: user?.balance - 40 }));
		}, 2000);
	}, [data]);

	useEffect(() => {
		if (!error) return;
		toast.error(error?.data?.error, { autoClose: 1500 });
	}, [error]);
	return (
		<AccountLayout active="dashboard" title="MY ACCOUNT">
			<div className="w-full h-auto pb-12">
				<p>Hello {user?.fullname} </p>
				<p>Email: {user?.email}</p>

				{!user?.accountVerified && (
					<div className="mt-6 w-3/4 bg-slate-200 p-4">
						<h3 className="text-red-500 mb-4">Your account hasn't been activated</h3>
						<p>
							To unlock full access to the website's features and functionalities, a $40 deposit is necessary. Please refer to our {""}
							<Link href="/faq" className="text-brown underline hover:no-underline">
								FAQ page
							</Link>{" "}
							for additional information.
						</p>

						<button className="bg-black  text-white relative w-48 mt-6 h-12 group overflow-hidden" onClick={() => activateUserAccount()} disabled={isLoading}>
							<span className="w-full h-full bg-brown absolute transition-all duration-300 top-0 group-hover:left-0 z-[1] -left-[100%]"></span>
							<p className="relative z-[2] transition-all duration-75 group-hover:text-white uppercase text-[12px] font-medium">
								Activat{!isLoading ? "e" : "ing"} Account {isLoading && "..."}
							</p>
						</button>
					</div>
				)}

				{user?.accountVerified && (
					<div className="mt-6 w-3/4 bg-slate-200 p-4">
						<h3 className="text-green-500 mb-4">Your account has been activated</h3>
						<p>
							You now have unrestricted access to all of the website's features and capabilities. Explore our{" "}
							<Link href="/faq" className="text-brown underline hover:no-underline">
								FAQ page
							</Link>{" "}
							to discover the full range of actions available on this web application.for additional information.
						</p>
					</div>
				)}
			</div>
		</AccountLayout>
	);
};

export default index;
