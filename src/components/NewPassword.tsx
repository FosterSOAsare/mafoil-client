import React from "react";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { toast } from "react-toastify";

import { resetPasswordSchema } from "@/libs/hookform";
import useSelectedValuesFromHookForm from "@/hooks/useSelectedValuesFromHookForm";
import { useConfirmPasswordResetRequestMutation } from "@/apis/authApi";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiRequest";

import PrimaryInput from "@/components/atom/PrimaryInput";
import PrimaryButton from "@/components/atom/PrimaryButton";
import { sendStatusCode } from "next/dist/server/api-utils";

const NewPassword = ({ details }: { details: { code: string; email: string } }) => {
	const { register, handleSubmit } = useSelectedValuesFromHookForm(resetPasswordSchema);
	const [confirmPasswordResetRequest, { data, isLoading, error }] = useConfirmPasswordResetRequestMutation();
	const { replace } = useRouter();

	function resetPassword(data: any) {
		const { password, confirmpassword } = data;
		if (password !== confirmpassword) {
			toast.error("Passwords do not match", { autoClose: 1500 });
			return;
		}
		confirmPasswordResetRequest({ newPassword: data?.password, ...details });
	}

	// Create error message from api
	useCreateErrorFromApiRequest(error);

	useEffect(() => {
		if (!data) return;
		toast.success("Password was successfully reset. Proceeding to login", { autoClose: 1500 });
		setTimeout(() => {
			replace(`/auth/login`);
		}, 1500);
	}, [data]);
	return (
		<>
			<form action="" className="w-full  h-auto flex flex-col items-start justify-center" onSubmit={handleSubmit(resetPassword)}>
				<h3 className="w-full text-2xl font-playfair mb-2  font-semibold ">Reset your password</h3>
				<p className="opacity-80 mb-4 text-sm">We will send you an email to reset your password.</p>
				<PrimaryInput name="password" placeholder="********" label="Enter new password" type="password" register={register} />
				<PrimaryInput name="confirmpassword" placeholder="********" label="Confirm new password" type="password" register={register} />

				<div className="flex items-center justify-between mt-4 gap-12 w-full">
					<PrimaryButton text="SAVE PASSWORD" type="submit" sx="m-0!" disabled={isLoading} />
				</div>
			</form>
		</>
	);
};

export default NewPassword;
