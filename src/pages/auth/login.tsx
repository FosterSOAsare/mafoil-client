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
	function loginUser(e: any) {
		e.preventDefault();
	}
	return (
		<main className="w-full h-screen px-4 flex items-center justify-center flex-col">
			<h1 className="font-medium font-playfair text-5xl mb-16">ACCOUNT</h1>
			<div className="max-w-6xl mx-auto flex items-start justify-center gap-16">
				<form action="" className="w-full  h-auto flex flex-col items-start justify-center" onSubmit={loginUser}>
					<h3 className="w-full text-2xl font-playfair mb-6 font-semibold ">Sign in</h3>
					<PrimaryInput name="email" placeholder="example@gmail.com" label="Email" register={register} />
					<PrimaryInput name="password" placeholder="********" label="Password" type="password" register={register} />

					<Link href="/auth/resetpassword" className="block mb-4 underline">
						Lost your password?
					</Link>

					<PrimaryButton text="SIGN IN" />
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
