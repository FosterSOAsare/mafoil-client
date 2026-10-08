import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useUserSlice } from "@/slices/user.slice";
import { useLazyAdminFetchOrdersRequestsQuery } from "@/apis/orderApi";

import AdminLayout from "@/components/layouts/admin.layout";
import Loading from "@/components/atom/Loading";
import OrderCard from "@/components/cards/OrderCard";

const orders = () => {
	const [sort, setSort] = useState("all");
	const { user } = useSelector(useUserSlice);

	const [fetchOrder, { data, isLoading, error }] = useLazyAdminFetchOrdersRequestsQuery();

	useEffect(() => {
		if (!user._id) return;
		fetchOrder(sort);
	}, [user, sort]);
	return (
		<AdminLayout>
			<h3 className="text-5xl font-bold text-center my-4">Orders</h3>
			<div className="w-full h-full min-h-[50vh] mb-12">
				<div className="w-1/2 mt-4 h-12 flex items-center justify-between">
					{["All", "Pending", "Completed", "Cancelled"].map((filter, index) => (
						<button key={index} className={`${filter.toLowerCase() === sort ? "text-brown font-bold" : "hover:text-brown"}`} onClick={() => setSort(filter.toLowerCase())}>
							{filter}
						</button>
					))}
				</div>

				{data && !isLoading && data?.length > 0 && (
					<div className="w-full h-auto flex justify-start mt-6 border-y items-stretch gap-4">
						<p className="w-1/3 text-center py-3 font-bold border-l">Status</p>
						<p className="w-1/3 text-center py-3 font-bold border-l">Date</p>
						<p className="w-1/3 text-center py-3 font-bold border-l">Total Price</p>
						{/* <p className="w-1/5 text-center py-3 font-bold border-l">Total Profit</p>
						<p className="w-1/5 text-center py-3 font-bold border-l">Average Profit(%)</p> */}
						<button className="w-12 block border-l"></button>
					</div>
				)}
				{data && !isLoading && data?.length === 0 && (
					<div className="w-1/2 h-[40vh] flex justify-center mt-6 items-center gap-4">
						<p>There is no data here ...</p>
					</div>
				)}
				{isLoading && (
					<div className="w-1/2 h-[40vh] flex items-center justify-center">
						<Loading />
					</div>
				)}

				{!isLoading && data && (
					<main className="w-full h-auto  block">
						{data.map((order: any, index: number) => (
							<OrderCard key={index} {...order} />
						))}
					</main>
				)}
			</div>
		</AdminLayout>
	);
};

export default orders;
