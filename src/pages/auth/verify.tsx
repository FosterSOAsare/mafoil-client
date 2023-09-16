import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";

import { useResendEmailRequestMutation, useVerifyUserEmailRequestMutation } from "@/apis/authApi";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiRequest";

import PrimaryButton from "@/components/atom/PrimaryButton";
import Otp from "@/components/Otp";

import { HiArrowNarrowLeft } from "react-icons/hi";
import { FiMail } from "react-icons/fi";

const verifiy = () => {
	const { isReady, query, push } = useRouter();
	const [verifyUserEmailRequest, { data: verifyEmailData, error, isLoading }] = useVerifyUserEmailRequestMutation();
	const [resendEmailRequest, { data: resendEmailData, error: resendEmailError, isLoading: resendEmailRequestLoading }] = useResendEmailRequestMutation();
	const { replace } = useRouter();

	const [code, setCode] = useState("");
	const [disabled, setDisabled] = useState(false);
	let [step, setStep] = useState(1);
	let mode = query?.mode as string,
		email = query?.email as string;

	useEffect(() => {
		if (!isReady) return;
		if (!email || !mode) {
			// Redirect to /login page
			push("/auth/login");
			return;
		}
	}, [isReady]);

	function handleChange(e: any) {
		// Check if value is only numbers
		let value = e.target.value;
		if (value.length <= 6) {
			if (value === "" || /^[0-9]+$/.test(value)) {
				setCode(e.target.value);
			}
		}
	}

	useEffect(() => {
		if (!resendEmailData) return;
		toast.success("Email verification mail resent successfully", { autoClose: 1500 });
	}, [resendEmailData]);

	useEffect(() => {
		if (!verifyEmailData) return;
		toast.success(`Email verification was successful. ${verifyEmailData?.code ? "Continuing to creating new password" : "Redirecting to login"}`, { autoClose: 1500 });
		setTimeout(() => {
			replace(`${verifyEmailData?.code ? `/auth/resetpassword?email=${email}&code=${verifyEmailData?.code}` : "/auth/login"}`);
		}, 1500);
	}, [verifyEmailData]);

	function verifyCode() {
		if (code.length < 6) {
			toast.error("The provided code is too short");
			return;
		}
		verifyUserEmailRequest({ code, mode, email });
	}

	//  Create toastify to notify errors
	useCreateErrorFromApiRequest(error);
	useCreateErrorFromApiRequest(resendEmailError);

	return (
		<main className="w-full h-screen flex items-center mx-auto max-w-[600px] justify-center">
			<article className="mt-16 flex w-full py-12 items-center flex-col justify-between text-center">
				<div className="icon w-14 h-14 rounded-full bg-[#210590] flex items-center bg-opacity-[0.1] justify-center">
					<div className="icon w-10 h-10 rounded-full bg-black flex items-center justify-center opacity-[1]">
						<FiMail className="text-white text-xl" />
					</div>
				</div>

				{step === 1 && (
					<>
						<h3 className="text-3xl text-primary font-bold mb-4">Check your email</h3>
						<p className="w-full lg:w-2/3 mb-8 text-desc">We sent a verification code in a mail to {email} </p>

						<PrimaryButton
							text="Enter OTP"
							type="button"
							sx="w-full md:w-3/5"
							handleClick={() => {
								setStep(2);
							}}
						/>
						<Link href="/auth/login" className="flex justify-start items-center gap-2 text-sm lg:mt-4 mt-8 hover:underline hover:text-sec">
							<HiArrowNarrowLeft />
							Back to log in
						</Link>
					</>
				)}
				{step === 2 && (
					<>
						<h3 className="text-xl lg:text-3xl text-primary font-bold mb-4">Enter Verification Code</h3>
						<p className="w-full  lg:w-4/5 text-sm mb-8 text-desc">We sent a verification code in a mail to {email} </p>
						<Otp code={code} handleChange={handleChange} />
						<PrimaryButton
							text={mode === "resetpassword" ? "Verify Reset Code" : "Verify email "}
							type="button"
							sx="w-full md:w-1/2"
							handleClick={verifyCode}
							disabled={isLoading || resendEmailRequestLoading}
						/>
						<p className="mt-4 text-sm">
							Didn't receive the email?{" "}
							<span className="text-blue hover:underline" onClick={() => resendEmailRequest({ mode, email })}>
								Click to resend
							</span>
						</p>
						<Link href="/auth/login" className="flex justify-start items-center gap-2 text-sm mt-4 hover:underline hover:text-sec">
							<HiArrowNarrowLeft />
							Back to log in
						</Link>
					</>
				)}
			</article>
			<ToastContainer />
		</main>
	);
};

export default verifiy;
