import React, { useState } from "react";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";

import { forgotPasswordSchema } from "@/libs/hookform";
import useSelectedValuesFromHookForm from "@/hooks/useSelectedValuesFromHookForm";
import { useRequestPasswordResetRequestMutation } from "@/apis/authApi";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiRequest";

import PrimaryInput from "@/components/atom/PrimaryInput";
import PrimaryButton from "@/components/atom/PrimaryButton";
import NewPassword from "@/components/NewPassword";
import ProtectedRoute from "@/components/ProtectedRoute";

const login = () => {
	const { register, handleSubmit, getValues } = useSelectedValuesFromHookForm(forgotPasswordSchema);
	const [requestPasswordResetRequest, { data, isLoading, error }] = useRequestPasswordResetRequestMutation();

	const { isReady, query, push } = useRouter();
	const [details, setDetails] = useState({ code: "", email: "" });
	useEffect(() => {
		if (!isReady || !query) return;
		let queryCode = query?.code as string,
			email = query?.email as string;

		if (!queryCode || !email) {
			// Redirect to /login page
			push("/auth/resetpassword");
		}
		setDetails({ code: queryCode, email });
	}, [isReady]);

	// Create error message from api
	useCreateErrorFromApiRequest(error);
	function resetPassword(data: any) {
		requestPasswordResetRequest(data.email);
		try {
		} catch (error) {
			console.log(error);
		}
	}
	useEffect(() => {
		if (!data || !getValues()) return;
		toast.success("Reset password mail successfully sent", { autoClose: 1500 });
		setTimeout(() => {
			push(`/auth/verify?mode=resetpassword&email=${getValues()?.email}`);
		}, 1500);
	}, [data]);
	return (
		<ProtectedRoute>
			<main className="w-full py-12 md:h-screen px-4 flex items-center justify-center flex-col">
				<h1 className="font-medium font-playfair text-5xl mb-16">ACCOUNT</h1>
				<div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-center gap-16">
					{!details?.code && (
						<form action="" className="w-full  h-auto flex flex-col items-start justify-center" onSubmit={handleSubmit(resetPassword)}>
							<h3 className="w-full text-2xl font-playfair mb-2  font-semibold ">Reset your password</h3>
							<p className="opacity-80 mb-4 text-sm">We will send you an email to reset your password.</p>
							<PrimaryInput name="email" placeholder="example@gmail.com" label="Email" register={register} />

							<div className="flex items-center justify-between mt-4 gap-12 w-full">
								<PrimaryButton text="SUBMIT" type="submit" sx="!m-0" disabled={isLoading} />
								<Link href="/auth/login" className="h-12 flex items-center justify-center w-full underline">
									Cancel
								</Link>
							</div>
						</form>
					)}
					{details?.code && <NewPassword details={details} />}
					<div className="w-full h-auto">
						<h3 className="text-2xl font-playfair font-semibold mb-6">New customer?</h3>
						<p className="text-md opacity-80 text-xl mb-4">Sign up for early Sale access plus tailored new arrivals, trends and promotions. To opt out, click unsubscribe in our emails.</p>
						<div className="w-full md:w-1/4">
							<PrimaryButton text="REGISTER" href="/auth/register" />
						</div>
					</div>
				</div>
				<ToastContainer />
			</main>
		</ProtectedRoute>
	);
};

export default login;
