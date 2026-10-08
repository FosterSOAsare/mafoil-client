import React, { FormEvent, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import PrimaryButton from "@/components/atom/PrimaryButton";
import { AiOutlineClose } from "react-icons/ai";
import { useCreateDepositCheckoutSessionRequestMutation, useValidateSessionPaymentMutation } from "@/apis/userApi";
import Loading from "@/components/atom/Loading";
import { useSearchParams } from "next/navigation";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiRequest";
import { useRouter } from "next/router";

const Status = () => {
	const searchParams = useSearchParams();
	const session = searchParams.get("session_id");
	const [validatePayment, { data: checkoutData, isLoading, error }]: any = useValidateSessionPaymentMutation();
	const router = useRouter();

	useEffect(() => {
		if (!session) return;
		validatePayment({ session_id: session as string });
	}, [session]);

	useEffect(() => {
		if (!checkoutData) return;
		toast.success("Deposit was successful created.", { autoClose: 1500 });

		setTimeout(() => {
			router.push("/account/transactions");
		}, 2500);
	}, [checkoutData]);

	useCreateErrorFromApiRequest(error);

	return (
		<aside className="w-full h-screen bg-slate-400 bg-opacity-40 fixed top-0 left-0 right-0 bottom-0 m-auto flex items-center justify-center z-6 p-4">
			<div className="w-2/5 h-auto p-6 shadow-md bg-white">
				<button className="w-8 h-8 ml-auto flex items-center justify-center hover:bg-slate-200 text-red-600" onClick={() => router.push("/account/transactions")}>
					<AiOutlineClose />
				</button>
				<h3 className="text-2xl font-medium rounded-[5px">Transaction Status</h3>

				{isLoading && (
					<div className="w-1/3 mt-8 flex flex-col items-center justify-center">
						<Loading sx="w-8! h-8!" />
						<p>Validating payment...</p>
					</div>
				)}

				{!isLoading && (
					<>
						{error && (
							<>
								<p> {error?.data?.error ? error?.data?.error : "An error occurred during operation"}</p>
								<button className="bg-black text-white mt-6 inline-bloack px-6 py-2" onClick={() => router.push("/account/transactions")}>
									Close modal
								</button>
							</>
						)}
						{checkoutData && (
							<>
								<div>
									<h3>Your deposit was successful</h3>
								</div>
							</>
						)}
					</>
				)}
			</div>
			<ToastContainer />
		</aside>
	);
};

export default Status;
