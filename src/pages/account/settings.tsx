import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import useSelectedValuesFromHookForm from "@/hooks/useSelectedValuesFromHookForm";
import { updateDetailsSchema, changePasswordSchema } from "@/libs/hookform";
import { useUpdateUserDetailsRequestMutation, useUpdateUserPasswordRequestMutation } from "@/apis/userApi";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiRequest";
import { useUserSlice } from "@/slices/user.slice";
import { setData } from "@/slices/user.slice";

import PrimaryInput from "@/components/atom/PrimaryInput";
import AccountLayout from "@/components/layouts/account.layout";
import PrimaryButton from "@/components/atom/PrimaryButton";
import { useRouter } from "next/router";

const Settings = () => {
	const dispatch = useDispatch();
	const { push } = useRouter();
	const { user } = useSelector(useUserSlice);
	const [active, setActive] = useState("general");
	const { register: generalRegister, handleSubmit, reset, getValues, reset: detailsReset } = useSelectedValuesFromHookForm(updateDetailsSchema);
	const { register: passwordRegister, handleSubmit: passwordSubmit, reset: passwordReset } = useSelectedValuesFromHookForm(changePasswordSchema);
	const [updateUserDetails, { data: userDetails, error: userDetailsError, isLoading: userDetailsLoading }] = useUpdateUserDetailsRequestMutation();
	const [updateUserPassword, { data: userPassword, error: userPasswordError, isLoading: userPasswordLoading }] = useUpdateUserPasswordRequestMutation();

	useEffect(() => {
		reset({ fullname: user?.fullname });
	}, [user?.fullname]);
	// Create toastify to notify errors
	useCreateErrorFromApiRequest(userDetailsError);
	useCreateErrorFromApiRequest(userPasswordError);

	function updateUserGeneralData(data: any) {
		let { fullname } = data;
		fullname = fullname.trim();
		updateUserDetails({ fullname });
	}

	function changeUserPassword(data: any) {
		const { oldpassword, confirmpassword, newpassword } = data;

		if (newpassword !== confirmpassword) {
			toast.error("Passwords do not match", { autoClose: 1500 });
			return;
		}
		if (newpassword === oldpassword) {
			toast.error("New password is same as old password. Please change new password", { autoClose: 1500 });
			return;
		}
		updateUserPassword({ newpassword, oldpassword });
	}

	useEffect(() => {
		if (!userDetails) return;
		toast.success("User details successfully updated", { autoClose: 1500 });
		setTimeout(() => {
			dispatch(setData({ fullname: getValues()?.fullname }));
			detailsReset();
			push("/account");
		}, 2000);
	}, [userDetails]);

	useEffect(() => {
		if (!userPassword) return;
		toast.success("User password successfully changed", { autoClose: 1500 });

		setTimeout(() => {
			passwordReset();
			push("/account");
		}, 1500);
	}, [userPassword]);
	return (
		<AccountLayout active="settings" title="ACCOUNT SETTINGS">
			<section className="w-full h-auto min-h-[50vh]">
				<div className="w-full flex gap-6">
					<button
						className={`w-1/5 font-bold h-10 border-sec flex items-center justify-center border-b-[4px] ${active === "general" ? "" : "border-transparent"}`}
						onClick={() => setActive("general")}>
						General
					</button>
					<button
						className={`w-1/5 font-bold h-10  flex items-center justify-center border-b-[4px] ${active === "security" ? " border-sec" : "border-transparent"}`}
						onClick={() => setActive("security")}>
						Security
					</button>{" "}
				</div>

				<div className="w-full mt-6">
					{active === "general" && (
						<form action="" className="w-1/2" onSubmit={handleSubmit(updateUserGeneralData)}>
							<PrimaryInput name="fullname" placeholder="John Doe" register={generalRegister} label="Fullname" />
							<div className="w-full mb-6">
								<p className="font-bold">
									Email <span className="text-sm">(cannot be changed)</span>
								</p>
								<p className="w-full p-2 bg-slate-200 mt-2">{user?.email}</p>
							</div>

							<PrimaryButton text="UPDATE DETAILS" type="submit" disabled={userDetailsLoading} />
						</form>
					)}

					{active === "security" && (
						<form action="" className="w-1/2" onSubmit={passwordSubmit(changeUserPassword)}>
							<PrimaryInput name="oldpassword" placeholder="*********" type="password" label="Current Password" register={passwordRegister} />
							<PrimaryInput name="newpassword" placeholder="*********" type="password" label="New Password" register={passwordRegister} />
							<PrimaryInput name="confirmpassword" placeholder="*********" type="password" label="Confirm New Password" register={passwordRegister} />

							<PrimaryButton text="UPDATE PASSWORD" type="submit" disabled={userPasswordLoading} />
						</form>
					)}
				</div>
			</section>
		</AccountLayout>
	);
};

export default Settings;
