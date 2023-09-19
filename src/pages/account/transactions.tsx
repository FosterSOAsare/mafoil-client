import React, { useState } from "react";

import Header from "@/components/molecules/Header";
import Footer from "@/components/molecules/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import Withdraw from "@/components/pages/Account/Withdraw";
import Deposit from "@/components/pages/Account/Deposit";

const transactions = () => {
	const [sort, setSort] = useState("all");
	const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
	return (
		<ProtectedRoute loginRequired={true}>
			<Header />
			<main className="w-full py-12  min-h-screen  max-w-7xl mx-auto  mb-12">
				<div className="w-auto flex item-center justify-end gap-4">
					<button className="bg-black text-white relative group h-12 px-5 overflow-hidden">
						<span className="w-full h-full bg-brown absolute transition-all duration-300 top-0 group-hover:left-0 z-[1] -left-[100%]"></span>
						<p className="relative z-[2] transition-all duration-75 group-hover:text-white uppercase text-[12px] font-medium">Deposit Funds</p>
					</button>
					<button className="border-black border-[1px] hover:border-brown text-black hover:text-white relative group h-12 px-5 overflow-hidden" onClick={() => setShowWithdrawalModal(true)}>
						<span className="w-full h-full bg-brown absolute transition-all duration-300 top-0 group-hover:left-0 z-[1] -left-[100%]"></span>
						<p className="relative z-[2] transition-all duration-75 group-hover:text-white uppercase text-[12px] font-medium">Withdraw Funds</p>
					</button>
				</div>
				<h3 className="text-2xl font-medium">My Transactions</h3>
				<div className="w-1/3 mt-4 h-12 flex items-center justify-between">
					{["All", "Active", "Completed"].map((filter, index) => (
						<button key={index} className={`${filter.toLowerCase() === sort ? "text-brown font-bold" : "hover:text-brown"}`} onClick={() => setSort(filter.toLowerCase())}>
							{filter}
						</button>
					))}
				</div>

				<div className="w-full min-h-[50vh] flex items-center justify-start">
					{/* {loading && (
						<div className="w-1/2 h-[20vh] flex items-center justify-center">
							<Loading sx="!w-8 !h-8" />
						</div>
					)}
					{!loading && <></>} */}
				</div>
				<Deposit />
				{showWithdrawalModal && <Withdraw closeModal={setShowWithdrawalModal} />}
			</main>
			<Footer />
		</ProtectedRoute>
	);
};

export default transactions;
