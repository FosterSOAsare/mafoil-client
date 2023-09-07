import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";

import { registerSchema } from "@/libs/hookform";

import PrimaryInput from "@/components/atom/PrimaryInput";
import PrimaryButton from "@/components/atom/PrimaryButton";

const login = () => {
	const {
		register,
		handleSubmit,
		clearErrors,
		formState: { errors },
	} = useForm({ resolver: zodResolver(registerSchema), shouldFocusError: false, reValidateMode: "onSubmit" });

	console.log(errors);
	function resetPassword(e: any) {
		e.preventDefault();
	}
	return (
		<main className="w-full h-screen px-4 flex items-center justify-center flex-col">
			<h1 className="font-medium font-playfair text-5xl mb-16">ACCOUNT</h1>
			<div className="max-w-6xl mx-auto flex items-start justify-center gap-16">
				<form action="" className="w-full  h-auto flex flex-col items-start justify-center" onSubmit={resetPassword}>
					<h3 className="w-full text-2xl font-playfair mb-2  font-semibold ">Reset your password</h3>
					<p className="opacity-80 mb-4 text-sm">We will send you an email to reset your password.</p>
					<PrimaryInput name="email" placeholder="example@gmail.com" label="Email" register={register} />

					<div className="flex items-center justify-between mt-4 gap-12 w-full">
						<PrimaryButton text="SIGN IN" sx="!m-0" />
						<Link href="/auth/login" className="h-12 flex items-center justify-center w-full underline">
							Cancel
						</Link>
					</div>
				</form>
				<div className="w-full h-auto">
					<h3 className="text-2xl font-playfair font-semibold mb-6">New customer?</h3>
					<p className="text-md opacity-80 text-xl mb-4">Sign up for early Sale access plus tailored new arrivals, trends and promotions. To opt out, click unsubscribe in our emails.</p>
					<div className="w-full md:w-1/4">
						<PrimaryButton text="REGISTER" href="/auth/register" />
					</div>
				</div>
			</div>
		</main>
	);
};

export default login;
