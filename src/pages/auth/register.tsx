import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import { useUserSlice } from "@/slices/user.slice";
import { registerSchema } from "@/libs/hookform";
import { useRegisterUserRequestMutation } from "@/apis/authApi";
import useSelectedValuesFromHookForm from "@/hooks/useSelectedValuesFromHookForm";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiRequest";

import PrimaryInput from "@/components/atom/PrimaryInput";
import PrimaryButton from "@/components/atom/PrimaryButton";
import SecondaryButton from "@/components/atom/SecondaryButton";
import ProtectedRoute from "@/components/ProtectedRoute";
import Cookies from "@/components/molecules/Cookies";

const register = () => {
	const { register, handleSubmit } = useSelectedValuesFromHookForm(registerSchema);
	const user = useSelector(useUserSlice);
	const [registerUserRequest, { error, data, isLoading }] = useRegisterUserRequestMutation();
	const { push } = useRouter();

	const [showCookies, setShowCookies] = useState(true);
	useEffect(() => {
		const cookie = localStorage.getItem("cookies");
		if (cookie === "accepted") {
			setShowCookies(false);
		}
	}, []);

	function storeNewUser(data: any) {
		const { password, cpassword, email, fullname } = data;
		if (password !== cpassword) {
			toast.error("Passwords do not match", { autoClose: 1500 });
			return;
		}

		const cookie = localStorage.getItem("cookies");
		if (!cookie || cookie === "rejected") {
			toast.error("You are required to allow cookies to perform this action", { autoClose: 1500 });
			setShowCookies(true);
			return;
		}

		// Send data to server
		let referrer = localStorage.getItem("referrer") as string;

		registerUserRequest({ password, email, fullname, referrer: referrer ? referrer : null });
	}

	// Create toastify to notify errors
	useCreateErrorFromApiRequest(error);

	useEffect(() => {
		if (!data) return;
		localStorage.removeItem("referrer");
		push(`/auth/verify?mode=accountverification&email=${data.email}`);
	}, [data]);

	return (
		<ProtectedRoute>
			<main className="w-full py-12 md:py-0 md:h-screen flex items-center justify-center px-4">
				<form action="" className="w-full max-w-[720px] h-auto flex flex-col items-center justify-center" onSubmit={handleSubmit(storeNewUser)}>
					<h1 className="font-medium font-playfair text-5xl mb-16">CREATE ACCOUNT</h1>
					<div className="w-full flex flex-col md:flex-row justify-between mb-6 gap-4 items-center">
						<PrimaryInput name="email" placeholder="example@email.com" register={register} label="Email" />
						<PrimaryInput name="fullname" placeholder="John Doe" register={register} label="Fullname" />
					</div>
					<div className="w-full flex flex-col md:flex-row justify-between gap-4 items-center">
						<PrimaryInput name="password" placeholder="*********" type="password" label="Password" register={register} />
						<PrimaryInput name="cpassword" placeholder="*********" type="password" label="Confirm Password" register={register} />
					</div>

					<p className="mb-4 opacity-60">Sign up for early Sale access plus tailored new arrivals, trends and promotions. To opt out, click unsubscribe in our emails.</p>

					<PrimaryButton text="REGISTER" type="submit" disabled={isLoading} />
					<SecondaryButton text="SIGN IN" href="/auth/login" disabled={isLoading} />
				</form>

				{showCookies && <Cookies setShowCookies={setShowCookies} />}
				<ToastContainer />
			</main>
		</ProtectedRoute>
	);
};

export default register;
