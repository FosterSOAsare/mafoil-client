import React from "react";
import Link from "next/link";

import { createDateFromString } from "@/utils/createDate";

import { AiOutlineLoading3Quarters, AiOutlineClose, AiOutlineEye } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

const OrderCard = ({ createdAt, totalPrice, totalProfit, status, avgProfitPercent, _id }: any) => {
	return (
		<div className="w-full h-auto flex justify-start  items-stretch gap-4 border-b">
			<div className={"w-1/3 text-center py-4 border-l flex items-center justify-center"}>
				{status === "pending" && <AiOutlineLoading3Quarters className="text-[grey]" />}
				{status === "completed" && <BsCheckLg className="text-green-500" />}
				{status === "cancelled" && <AiOutlineClose className="text-red-600" />}
			</div>
			<p className="w-1/3 text-center py-4 text-sm md:text-[16px] border-l">{createDateFromString(createdAt)}</p>
			<p className="w-1/3 text-center py-4 text-sm md:text-[16px] border-l">GH₵{totalPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
			{/* <p className="w-1/5 text-center py-4 border-l">GH₵{totalProfit?.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
			<p className="w-1/5 text-center py-4 border-l ">{avgProfitPercent}%</p> */}

			<div className="w-12 flex items-center justify-center border-l">
				<Link href={`/orders/${_id}`} className="h-7 w-7 flex items-center justify-center hover:bg-slate-200 rounded-full" title="View Order">
					<AiOutlineEye />
				</Link>
			</div>
		</div>
	);
};

export default OrderCard;
