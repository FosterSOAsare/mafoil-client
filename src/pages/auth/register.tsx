import React, { useEffect } from "react";
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

const register = () => {
	const { register, handleSubmit } = useSelectedValuesFromHookForm(registerSchema);
	const user = useSelector(useUserSlice);
	const [registerUserRequest, { error, data, isLoading }] = useRegisterUserRequestMutation();
	const { push } = useRouter();

	function storeNewUser(data: any) {
		const { password, cpassword, email, fullname } = data;
		if (password !== cpassword) {
			toast.error("Passwords do not match", { autoClose: 1500 });
			return;
		}

		// Send data to server
		registerUserRequest({ password, email, fullname });
	}

	// Create toastify to notify errors
	useCreateErrorFromApiRequest(error);

	useEffect(() => {
		if (!data) return;
		push(`/auth/verify?mode=accountverification&email=${data.email}`);
	}, [data]);

	return (
		<ProtectedRoute>
			<main className="w-full h-screen flex items-center justify-center px-4">
				<form action="" className="w-full max-w-[720px] h-auto flex flex-col items-center justify-center" onSubmit={handleSubmit(storeNewUser)}>
					<h1 className="font-medium font-playfair text-5xl mb-16">CREATE ACCOUNT</h1>
					<div className="w-full flex justify-between mb-6 gap-4 items-center">
						<PrimaryInput name="email" placeholder="example@email.com" register={register} label="Email" />
						<PrimaryInput name="fullname" placeholder="John Doe" register={register} label="Fullname" />
					</div>
					<div className="w-full flex justify-between gap-4 items-center">
						<PrimaryInput name="password" placeholder="*********" type="password" label="Password" register={register} />
						<PrimaryInput name="cpassword" placeholder="*********" type="password" label="Confirm Password" register={register} />
					</div>

					<p className="mb-4 opacity-60">Sign up for early Sale access plus tailored new arrivals, trends and promotions. To opt out, click unsubscribe in our emails.</p>

					<PrimaryButton text="REGISTER" type="submit" disabled={isLoading} />
					<SecondaryButton text="SIGN IN" href="/auth/login" disabled={isLoading} />
				</form>
				<ToastContainer />
			</main>
		</ProtectedRoute>
	);
};

export default register;
