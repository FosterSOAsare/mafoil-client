import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";

import { registerSchema } from "@/libs/hookform";

import PrimaryInput from "@/components/atom/PrimaryInput";
import PrimaryButton from "@/components/atom/PrimaryButton";
import SecondaryButton from "@/components/atom/SecondaryButton";

const register = () => {
	const {
		register,
		handleSubmit,
		clearErrors,
		formState: { errors },
	} = useForm({ resolver: zodResolver(registerSchema), shouldFocusError: false, reValidateMode: "onSubmit" });
	function registerUser(data: any) {
		const { password, cpassword } = data;
		if (password !== cpassword) {
			toast.error("Passwords do not match", { autoClose: 1500 });
			return;
		}

		// Send data to server
	}

	useEffect(() => {
		let keys = Array.from(Object.keys(errors));
		let err: any = errors[keys[0]]?.message;
		if (keys.length > 0) {
			toast.error(err, { autoClose: 1500 });
		}
	}, [errors]);
	return (
		<main className="w-full h-screen flex items-center justify-center px-4">
			<form action="" className="w-full max-w-[720px] h-auto flex flex-col items-center justify-center" onSubmit={handleSubmit(registerUser)}>
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

				<PrimaryButton text="REGISTER" type="submit" />
				<SecondaryButton text="SIGN IN" href="/auth/login" />
			</form>
			<ToastContainer />
		</main>
	);
};

export default register;
