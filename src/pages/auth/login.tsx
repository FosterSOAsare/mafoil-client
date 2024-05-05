import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { loginSchema } from "@/libs/hookform";
import useSelectedValuesFromHookForm from "@/hooks/useSelectedValuesFromHookForm";
import { useLoginRequestMutation } from "@/apis/authApi";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiRequest";
import { setData, setIsLoading, useUserSlice, setError } from "@/slices/user.slice";

import PrimaryInput from "@/components/atom/PrimaryInput";
import PrimaryButton from "@/components/atom/PrimaryButton";
import ProtectedRoute from "@/components/ProtectedRoute";
import Cookies from "@/components/molecules/Cookies";
import { setCookie } from "@/utils/cookie";

const login = () => {
	const { register, handleSubmit, getValues } = useSelectedValuesFromHookForm(loginSchema);
	const [loginRequest, { data, error, isLoading }]: any = useLoginRequestMutation();
	const dispatch = useDispatch();
	const { push } = useRouter();
	const [showCookies, setShowCookies] = useState(true);
	useEffect(() => {
		const cookie = localStorage.getItem("cookies");
		if (cookie === "accepted") {
			setShowCookies(false);
		}
	}, []);

	function loginUser(data: any) {
		// Check if cookies is set
		const cookie = localStorage.getItem("cookies");
		if (!cookie || cookie === "rejected") {
			toast.error("You are required to allow cookies to perform this action", { autoClose: 1500 });
			setShowCookies(true);
			return;
		}
		loginRequest(data);
	}

	// Create error message from api
	useCreateErrorFromApiRequest(error);

	useEffect(() => {
		if (!data) return;
		toast.success("Login was successful. Redirecting...", { autoClose: 1500 });

		// Set cookie
		setCookie("access_token", data.token, 30);
		// Store data in redux
		dispatch(setData(data));
		dispatch(setError(false));
		dispatch(setIsLoading(false));
	}, [data]);

	useEffect(() => {
		if (!error) return;
		let err = error?.data?.error;
		if (err == "Email is not verified , redirecting you to verify your email address") {
			toast.error(err, { autoClose: 1500 });
			push(`/auth/verify?mode=accountverification&email=${getValues().email}`);
		}
	}, [error]);

	return (
		<ProtectedRoute>
			<main className="w-full md:h-screen py-12 md:py-0 px-4 flex items-center justify-center flex-col">
				<h1 className="font-medium font-playfair text-5xl mb-16">ACCOUNT</h1>
				<div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-center gap-16">
					<form action="" className="w-full  h-auto flex flex-col items-start justify-center" onSubmit={handleSubmit(loginUser)}>
						<h3 className="w-full text-2xl font-playfair mb-6 font-semibold ">Sign in</h3>
						<PrimaryInput name="email" placeholder="example@gmail.com" label="Email" register={register} />
						<PrimaryInput name="password" placeholder="********" label="Password" type="password" register={register} />

						<Link href="/auth/resetpassword" className="block mb-4 underline">
							Lost your password?
						</Link>

						<PrimaryButton text="SIGN IN" type="submit" disabled={isLoading} />
					</form>
					<div className="w-full h-auto">
						<h3 className="text-2xl font-playfair font-semibold mb-6">New customer?</h3>
						<p className="text-md opacity-80 text-xl mb-4">Sign up for early Sale access plus tailored new arrivals, trends and promotions. To opt out, click unsubscribe in our emails.</p>
						<div className="w-full md:w-1/4">
							<PrimaryButton text="REGISTER" href="/auth/register" disabled={isLoading} />
						</div>
					</div>
				</div>

				{showCookies && <Cookies setShowCookies={setShowCookies} />}
				<ToastContainer />
			</main>
		</ProtectedRoute>
	);
};

export default login;
