import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import AdminLayout from "@/components/layouts/admin.layout";
const index = () => {
	const { pathname } = useRouter();

	return (
		<AdminLayout>
			<main className="w-full h-auto">
				<section className="w-full h-[200px] border-[1px] border-slate-500"></section>
				<section className="wfull h-[300px] mt-6 gap-6 flex items-center justify-between">
					<div className="w-2/3 h-full border-slate-500 border-[1px] rounded-[5px] p-3">
						<h3 className="font-semibold">Overview Statistics</h3>
					</div>
					<div className="w-1/3 h-full border-slate-500 border-[1px] rounded-[5px] p-3">
						<h3 className="font-semibold">Transaction History</h3>
					</div>
				</section>
				<section className="wfull h-[200px] mt-6 gap-6 flex items-center justify-between">
					<div className="w-1/3 h-full border-slate-500 border-[1px] rounded-[5px] p-3">
						<h3 className="font-semibold">Order Status</h3>
					</div>
					<div className="w-2/3 h-full border-slate-500 border-[1px] rounded-[5px] p-3">
						<h3 className="font-semibold">Recent Orders</h3>
					</div>
				</section>
			</main>
		</AdminLayout>
	);
};

export default index;
