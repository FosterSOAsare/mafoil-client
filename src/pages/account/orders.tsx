import React, { useState } from "react";

import AccountLayout from "@/components/layouts/account.layout";
import Loading from "@/components/atom/Loading";

const orders = () => {
	const [sort, setSort] = useState("all");
	const [loading, setLoading] = useState(true);
	return (
		<AccountLayout active="orders">
			<div className="w-full h-full min-h-[50vh] mb-12">
				<h3 className="text-2xl font-medium">My Orders</h3>
				<div className="w-1/3 mt-4 h-12 flex items-center justify-between">
					{["All", "Active", "Completed"].map((filter, index) => (
						<button key={index} className={`${filter.toLowerCase() === sort ? "text-brown font-bold" : "hover:text-brown"}`} onClick={() => setSort(filter.toLowerCase())}>
							{filter}
						</button>
					))}
				</div>

				<div className="w-full min-h-[50vh] flex items-center justify-start">
					{loading && (
						<div className="w-1/2 h-[20vh] flex items-center justify-center">
							<Loading sx="!w-8 !h-8" />
						</div>
					)}
					{!loading && <></>}
				</div>
			</div>
		</AccountLayout>
	);
};

export default orders;
