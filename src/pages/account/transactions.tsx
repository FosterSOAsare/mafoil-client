import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useUserSlice } from "@/slices/user.slice";
import { useLazyFetchTransactionsQuery } from "@/apis/transactionsApi";
import { createDateFromString } from "@/utils/createDate";

import Header from "@/components/molecules/Header";
import Footer from "@/components/molecules/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import Withdraw from "@/components/pages/Account/Withdraw";
import Deposit from "@/components/pages/Account/Deposit";
import Loading from "@/components/atom/Loading";

import { AiOutlineLoading3Quarters, AiOutlineClose, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

const transactions = () => {
	const { user } = useSelector(useUserSlice);
	const [sort, setSort] = useState("all");
	const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
	const [showDepositModal, setShowDepositModal] = useState(false);

	const [fetchTransaction, { data, error, isLoading }]: any = useLazyFetchTransactionsQuery();

	useEffect(() => {
		if (!user._id) return;
		fetchTransaction(sort);
	}, [user, sort]);

	return (
		<ProtectedRoute loginRequired={true}>
			<Header />
			<main className="w-full py-12  min-h-screen  max-w-7xl mx-auto  mb-12">
				<div className="w-auto flex item-center justify-end gap-4">
					<button className="bg-black text-white relative group h-12 px-5 overflow-hidden" onClick={() => setShowDepositModal(true)}>
						<span className="w-full h-full bg-brown absolute transition-all duration-300 top-0 group-hover:left-0 z-[1] -left-[100%]"></span>
						<p className="relative z-[2] transition-all duration-75 group-hover:text-white uppercase text-[12px] font-medium">Deposit Funds</p>
					</button>
					<button className="border-black border-[1px] hover:border-brown text-black hover:text-white relative group h-12 px-5 overflow-hidden" onClick={() => setShowWithdrawalModal(true)}>
						<span className="w-full h-full bg-brown absolute transition-all duration-300 top-0 group-hover:left-0 z-[1] -left-[100%]"></span>
						<p className="relative z-[2] transition-all duration-75 group-hover:text-white uppercase text-[12px] font-medium">Withdraw Funds</p>
					</button>
				</div>
				<h3 className="text-2xl font-medium">My Transactions</h3>
				<div className="w-1/4 mt-4 h-12 flex items-center justify-between">
					{["All", "Pending", "Completed"].map((filter, index) => (
						<button key={index} className={`${filter.toLowerCase() === sort ? "text-brown font-bold" : "hover:text-brown"}`} onClick={() => setSort(filter.toLowerCase())}>
							{filter}
						</button>
					))}
				</div>

				{isLoading && (
					<div className="w-1/2 h-[20vh] flex items-center justify-center">
						<Loading sx="!w-8 !h-8" />
					</div>
				)}
				<div className="w-full min-h-[50vh]">
					{!isLoading && (
						<>
							{data && data?.length > 0 && (
								<div className="w-full">
									<div className="w-full h-auto flex justify-between mt-6 border-y-[1px] items-stretch">
										<p className="w-1/5 text-center py-3 font-bold border-l-[1px]">Txn Type</p>
										<p className="w-1/5 text-center py-3 font-bold border-l-[1px]">Desc</p>
										<p className="w-1/5 text-center py-3 font-bold border-l-[1px]">Amount</p>
										<p className="w-1/5 text-center py-3 font-bold border-l-[1px]">Date</p>
										<p className="w-1/5 text-center py-3 font-bold border-l-[1px] border-r-[1px]">Status</p>
									</div>
								</div>
							)}

							{data && data?.length > 0 && (
								<main className="w-full h-auto  block">
									{data.map((order: any, index: number) => (
										<div className={`w-full h-auto ${index % 2 === 0 && "bg-slate-100"} flex justify-start  items-stretch border-b-[1px]`} key={index}>
											<div className={"w-1/5 text-center py-4 border-l-[1px] flex items-center justify-center"}>
												{order?.type === "deposit" && <AiOutlinePlus className="text-green-500" />}
												{order?.type === "withdraw" && <AiOutlineMinus className="text-red-600" />}
											</div>
											<p className="w-1/5 text-center py-4 border-l-[1px]">{order?.desc}</p>
											<p className="w-1/5 text-center py-4 border-l-[1px]">GH₵{order?.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
											<p className="w-1/5 text-center py-4 border-l-[1px]">{createDateFromString(order?.createdAt)}</p>
											<div className="w-1/5 text-center py-4 border-l-[1px]  flex items-center justify-center border-r-[1px]">
												{order?.status === "pending" && <AiOutlineLoading3Quarters className="text-[grey]" />}
												{order?.status === "completed" && <BsCheckLg className="text-green-500" />}
												{order?.status === "cancelled" && <AiOutlineClose className="text-red-600" />}
											</div>
										</div>
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
				{showDepositModal && <Deposit closeModal={setShowDepositModal} />}
				{showWithdrawalModal && <Withdraw closeModal={setShowWithdrawalModal} />}
			</main>
			<Footer />
		</ProtectedRoute>
	);
};

export default transactions;
