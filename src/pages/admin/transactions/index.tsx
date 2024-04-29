import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useUserSlice } from "@/slices/user.slice";
import { useLazyAdminFetchTransactionsQuery } from "@/apis/transactionsApi";

import Loading from "@/components/atom/Loading";
import AdminLayout from "@/components/layouts/admin.layout";
import AdminTransactionRow from "@/components/pages/Admin/AdminTransactionRow";

const transactions = () => {
	const { user } = useSelector(useUserSlice);
	const [sort, setSort] = useState("all");

	const [fetchTransaction, { data, error, isLoading }]: any = useLazyAdminFetchTransactionsQuery();

	useEffect(() => {
		if (!user._id) return;
		fetchTransaction(sort);
	}, [user, sort]);
	return (
		<AdminLayout>
			<main>
				<section className="w-full bg- flex items-center justify-center flex-col " id="hero">
					<h1 className="text-4xl mb-2 font-medium">TRANSACTIONS</h1>

					<div className="bg-[#14C100] h-2 w-1/3 rounded-[5px]"></div>
				</section>
				<div className="w-1/4 mt-4 h-12 flex items-center justify-between">
					{["All", "Pending", "Completed"].map((filter, index) => (
						<button key={index} className={`${filter.toLowerCase() === sort ? "text-brown font-bold" : "hover:text-brown"}`} onClick={() => setSort(filter.toLowerCase())}>
							{filter}
						</button>
					))}
				</div>

				{isLoading && (
					<div className="w-full h-[60vh] flex items-center justify-center">
						<Loading sx="!w-8 !h-8" />
					</div>
				)}
				<div className="w-full min-h-[50vh]">
					{!isLoading && (
						<>
							{data && data?.length > 0 && (
								<div className="w-full">
									<div className="w-full h-auto flex justify-between mt-6 border-[1px] items-stretch">
										<p className="w-[15%] text-center py-3 font-bold">Txn Type</p>
										<p className="w-[30%] text-center py-3 font-bold border-l-[1px]">Desc</p>
										<p className="w-1/5 text-center py-3 font-bold border-l-[1px]">Amount</p>
										<p className="w-1/5 text-center py-3 font-bold border-l-[1px]">Date</p>
										<p className="w-[10%] text-center py-3 font-bold border-l-[1px]">Status</p>
										<div className="w-[15%] text-center py-3 font-bold border-l-[1px]"></div>
									</div>
								</div>
							)}

							{data && data?.length > 0 && (
								<main className="w-full h-auto  block">
									{data.map((txn: any, index: number) => (
										<AdminTransactionRow key={index} {...txn} index={index} />
									))}
								</main>
							)}
							{data && data?.length === 0 && (
								<div className="w-1/2 h-[40vh] flex justify-center mt-6 items-center gap-4">
									<p>There is no data here ...</p>
								</div>
							)}
						</>
					)}
				</div>
			</main>
		</AdminLayout>
	);
};

export default transactions;
