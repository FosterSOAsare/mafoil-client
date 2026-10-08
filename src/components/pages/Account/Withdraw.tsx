import React, { useEffect } from "react";
import { toast } from "react-toastify";

import useSelectedValuesFromHookForm from "@/hooks/useSelectedValuesFromHookForm";
import { withdrawSchema } from "@/libs/hookform";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiRequest";
import { useWithdrawFundRequestMutation } from "@/apis/userApi";

import PrimaryButton from "@/components/atom/PrimaryButton";
import SecondaryButton from "@/components/atom/SecondaryButton";
import PrimaryInput from "@/components/atom/PrimaryInput";

const Withdraw = ({ closeModal }: { closeModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
	const { register, handleSubmit, reset } = useSelectedValuesFromHookForm(withdrawSchema);
	const [withdrawFundsRequest, { data, error, isLoading }]: any = useWithdrawFundRequestMutation();
	const withdrawFunds = async (data: any) => {
		let { address, amount } = data;
		withdrawFundsRequest({ address, amount: +amount });
	};

	useEffect(() => {
		if (!data) return;
		toast.success("Withdrawal request completed", { autoClose: 1500 });

		setTimeout(() => {
			reset();
			closeModal(false);
			window.location.reload();
		}, 1500);
	}, [data]);
	// Create toastify to notify errors
	useCreateErrorFromApiRequest(error);
	return (
		<aside className="w-full h-screen bg-slate-400 bg-opacity-40 fixed top-0 left-0 right-0 bottom-0 m-auto flex items-center justify-center z-6 p-4">
			<div className="w-full md:w-2/5 h-auto p-6 shadow-md bg-white">
				<h3 className="text-2xl font-medium rounded-[5px">Withdraw Funds</h3>

				<form action="" onSubmit={handleSubmit(withdrawFunds)}>
					<PrimaryInput name="address" placeholder="" register={register} label="Enter Your Account Number" />
					<PrimaryInput name="amount" placeholder="100.00" register={register} label="Enter Amount To Withdraw" />

					<div className="w-full flex flex-col md:flex-row items-center justify-between md:gap-6">
						<PrimaryButton text="WITHDRAW FUNDS" type="submit" disabled={isLoading} />
						<SecondaryButton text="CANCEL" handleClick={() => closeModal(false)} />
					</div>
				</form>
			</div>
		</aside>
	);
};

export default Withdraw;
