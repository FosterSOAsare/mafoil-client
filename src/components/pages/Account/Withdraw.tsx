import React from "react";
import { ToastContainer } from "react-toastify";

import useSelectedValuesFromHookForm from "@/hooks/useSelectedValuesFromHookForm";
import { withdrawSchema } from "@/libs/hookform";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiRequest";

import PrimaryButton from "@/components/atom/PrimaryButton";
import SecondaryButton from "@/components/atom/SecondaryButton";
import PrimaryInput from "@/components/atom/PrimaryInput";

const Withdraw = ({ closeModal }: any) => {
	const { register, handleSubmit } = useSelectedValuesFromHookForm(withdrawSchema);

	const withdrawFunds = async () => {};

	// Create toastify to notify errors
	// useCreateErrorFromApiRequest(error);
	return (
		<aside className="w-full h-screen bg-slate-400 bg-opacity-40 fixed top-0 left-0 right-0 bottom-0 m-auto flex items-center justify-center z-[5] p-4">
			<div className="w-2/5 h-auto p-6 shadow-md bg-white">
				<h3 className="text-2xl font-medium rounded-[5px">Withdraw Funds</h3>
				<p className="text-red-500 text-[12px] mb-6">Please only provide a wallet from the TRC-20 chain to avoid money loss</p>

				<form action="" onSubmit={handleSubmit(withdrawFunds)}>
					<PrimaryInput name="address" placeholder="" register={register} label="Enter USDT(TRC-20) address" />
					<PrimaryInput name="ammount" placeholder="100.00" register={register} label="Enter Amount To Withdraw" />

					<PrimaryButton text="REGISTER" type="submit" />
					<SecondaryButton text="CANCEL" handleClick={() => closeModal()} />
				</form>
			</div>
			<ToastContainer />
		</aside>
	);
};

export default Withdraw;
