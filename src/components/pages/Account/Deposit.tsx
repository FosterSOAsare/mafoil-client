import React, { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

// import { BiCopyAlt } from "react-icons/bi";
// import { BsCheckLg } from "react-icons/bs";

import PrimaryButton from "@/components/atom/PrimaryButton";
import { AiOutlineClose } from "react-icons/ai";
import { useCreateDepositCheckoutSessionRequestMutation } from "@/apis/userApi";

const Deposit = ({ closeModal }: { closeModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
	// const [copied, setCopied] = useState(false);
	const depositAddress = "TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR";
	const [amount, setAmount] = useState("");
	const [createDepositSession, { data: sessionData, isLoading, error }] = useCreateDepositCheckoutSessionRequestMutation();

	// function handleCopiedClipboard() {
	// 	setCopied(true);

	// 	// Copy to clipboard
	// 	navigator.clipboard.writeText(depositAddress);
	// 	toast.success("Deposit address copied to clipboard", { autoClose: 1500 });

	// 	setTimeout(() => {
	// 		setCopied(false);
	// 	}, 2000);
	// }

	const createCheckoutSession = async (e: FormEvent) => {
		e.preventDefault();
		if (!amount) {
			toast.error("Please enter an amount", { autoClose: 1500 });
			return;
		}
		if (isNaN(+amount)) {
			toast.error("Please provide a valid amount", { autoClose: 1500 });
			return;
		}

		createDepositSession({ amount: +amount });
	};

	useEffect(() => {
		if (!sessionData) return;
		toast.success("Deposit session created. Proceed to payment", { autoClose: 1500 });
		window.location.href = sessionData.url;
	}, [sessionData]);

	return (
		<aside className="w-full h-screen bg-slate-400 bg-opacity-40 fixed top-0 left-0 right-0 bottom-0 m-auto flex items-center justify-center z-6 p-4">
			<div className="w-full md:w-2/5 h-auto p-6 shadow-md bg-white">
				<button className="w-8 h-8 ml-auto flex items-center justify-center hover:bg-slate-200 text-red-600" onClick={() => closeModal(false)}>
					<AiOutlineClose />
				</button>
				<h3 className="text-2xl font-medium rounded-[5px">Deposit Funds</h3>
				{/* <p className="text-red-500 text-[12px] mb-6">Please make sure to deposit only using TRC-20 chain to avoid money loss</p> */}

				{/* <div className="flex justify-center items-center border pl-2 rounded-[5px]">
					<p className="w-full h-auto">{depositAddress}</p>
					<button className="w-12 hover:cursor-pointer flex items-center justify-center h-12" onClick={handleCopiedClipboard}>
						{!copied && <BiCopyAlt className="text-slate-300  hover:text-black text-2xl " />}
						{copied && <BsCheckLg className="text-slate-300  hover:text-black text-2xl " />}
					</button>
				</div> */}

				<form className="flex  flex-col" onSubmit={createCheckoutSession}>
					<label htmlFor="amount" className="mt-4 w-full block">
						Enter the amount you want to deposit
					</label>
					<input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full block border-black border p-3" id="amount" placeholder="2500.00" />

					<PrimaryButton text="Deposit" type="submit" sx="mt-6! w-1/2!" disabled={isLoading} />
				</form>
			</div>
		</aside>
	);
};

export default Deposit;
