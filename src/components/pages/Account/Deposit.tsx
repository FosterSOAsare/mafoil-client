import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { BiCopyAlt } from "react-icons/bi";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

const Deposit = ({ closeModal }: { closeModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
	const [copied, setCopied] = useState(false);
	const depositAddress = "TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR";

	function handleCopiedClipboard() {
		setCopied(true);

		// Copy to clipboard
		navigator.clipboard.writeText(depositAddress);
		toast.success("Deposit address copied to clipboard", { autoClose: 1500 });

		setTimeout(() => {
			setCopied(false);
		}, 2000);
	}

	return (
		<aside className="w-full h-screen bg-slate-400 bg-opacity-40 fixed top-0 left-0 right-0 bottom-0 m-auto flex items-center justify-center z-[6] p-4">
			<div className="w-2/5 h-auto p-6 shadow-md bg-white">
				<button className="w-8 h-8 ml-auto flex items-center justify-center hover:bg-slate-200 text-red-600" onClick={() => closeModal(false)}>
					<AiOutlineClose />
				</button>
				<h3 className="text-2xl font-medium rounded-[5px">Deposit Funds</h3>
				<p className="text-red-500 text-[12px] mb-6">Please make sure to deposit only using TRC-20 chain to avoid money loss</p>

				<div className="flex justify-center items-center border-[1px] pl-2 rounded-[5px]">
					<p className="w-full h-auto">{depositAddress}</p>
					<button className="w-12 hover:cursor-pointer flex items-center justify-center h-12" onClick={handleCopiedClipboard}>
						{!copied && <BiCopyAlt className="text-slate-300  hover:text-black text-2xl " />}
						{copied && <BsCheckLg className="text-slate-300  hover:text-black text-2xl " />}
					</button>
				</div>
			</div>
			<ToastContainer />
		</aside>
	);
};

export default Deposit;
