import React, { useState, useRef } from "react";
import Link from "next/link";

import { createDateFromString } from "@/utils/createDate";
import useCheckClickOutsideParent from "@/hooks/useCheckClickOutsideParent";

import { AiOutlineLoading3Quarters, AiOutlineClose, AiOutlinePlus, AiOutlineMinus, AiFillEye } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

const AdminTransactionRow = ({ index, type, desc, amount, createdAt, status, _id }: { _id: string; index: number; type: string; desc: string; amount: number; createdAt: string; status: string }) => {
	const [show, setShow] = useState(true);
	const parentRef = useRef<any>(null);
	useCheckClickOutsideParent({ parentRef, setShow });
	return (
		<div className={`w-full h-auto ${index % 2 == 0 && "bg-slate-100"} flex justify-start  items-stretch border border-t-0`} key={index}>
			<div className={"w-[15%] text-center py-4 flex items-center justify-center"}>
				{type?.toLowerCase() === "deposit" && <AiOutlinePlus className="text-green-500" />}
				{type?.toLowerCase() === "withdraw" && <AiOutlineMinus className="text-red-600" />}
			</div>
			<p className="w-[30%] text-center py-4 border-l">{desc}</p>
			<p className="w-1/5 text-center py-4 border-l">GH₵{amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
			<p className="w-1/5 text-center py-4 border-l">{createDateFromString(createdAt)}</p>
			<div className="w-[10%] text-center py-4 border-l  flex items-center justify-center">
				{status === "pending" && <AiOutlineLoading3Quarters className="text-[grey]" />}
				{status === "completed" && <BsCheckLg className="text-green-500" />}
				{status === "cancelled" && <AiOutlineClose className="text-red-600" />}
			</div>
			<div className="w-[15%] flex items-center justify-center h-auto border-l relative" ref={parentRef}>
				{/* Admin should view only pending transactions about withdrawal */}
				{desc === "Withdrawal from account" && status === "pending" && (
					<Link href={`/admin/transactions/${_id}`} className="w-8 rounded-full flex items-center mx-auto justify-center hover:bg-slate-200 h-8" onClick={() => setShow(true)}>
						<AiFillEye />
					</Link>
				)}
			</div>
		</div>
	);
};

export default AdminTransactionRow;
