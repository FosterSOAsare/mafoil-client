import React, { useEffect, useState } from "react";
import Head from "next/head";

import { useLazyFetchOrdersRequestQuery } from "@/apis/orderApi";
import { useSelector } from "react-redux";
import { useUserSlice } from "@/slices/user.slice";

import AccountLayout from "@/components/layouts/account.layout";
import Loading from "@/components/atom/Loading";
import OrderCard from "@/components/cards/OrderCard";

const orders = () => {
	const [sort, setSort] = useState("all");
	const { user } = useSelector(useUserSlice);

	const [fetchOrder, { data, isFetching: isLoading, error }] = useLazyFetchOrdersRequestQuery();

	useEffect(() => {
		if (!user._id) return;
		fetchOrder(sort);
	}, [user, sort]);

	return (
		<AccountLayout active="orders" title="MY ORDERS">
			<Head>
				<title>Mafo.il - Your orders</title>
			</Head>
			<div className="w-full h-full min-h-[50vh] mb-12">
				<div className="w-1/2 mt-4 h-12 gap-4 flex items-center justify-between">
					{["All", "Pending", "Completed", "Cancelled"].map((filter, index) => (
						<button key={index} className={`${filter.toLowerCase() === sort ? "text-brown font-bold" : "hover:text-brown"}`} onClick={() => setSort(filter.toLowerCase())}>
							{filter}
						</button>
					))}
				</div>

				{data && !isLoading && data?.length > 0 && (
					<div className="w-full overflow-x-auto">
						<div className="w-[150%] md:w-full h-auto flex justify-start mt-6 border-y-[1px] items-stretch gap-4">
							<p className="w-1/3 text-center py-3 font-bold border-l-[1px]">Status</p>
							<p className="w-1/3 text-center py-3 font-bold border-l-[1px]">Date</p>
							<p className="w-1/3 text-center py-3 font-bold border-l-[1px]">Total Price</p>
							{/* <p className="w-1/5 text-center py-3 font-bold border-l-[1px]">Total Profit</p>
						<p className="w-1/5 text-center py-3 font-bold border-l-[1px]">Average Profit(%)</p> */}
							<button className="w-12 block border-l-[1px]"></button>
						</div>
						<main className="w-[150%] md:w-full h-auto  block">
							{data.map((order: any, index: number) => (
								<OrderCard key={index} {...order} />
							))}
						</main>
					</div>
				)}
				{data && !isLoading && data?.length === 0 && (
					<div className="w-1/2 h-[40vh] flex justify-center mt-6 items-center gap-4">
						<p>There is no data here ...</p>
					</div>
				)}
				{isLoading && (
					<div className="w-1/2 h-[40vh] flex items-center justify-center">
						<Loading sx="!h-8 !w-8" />
					</div>
				)}
			</div>
		</AccountLayout>
	);
};

export default orders;
