import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";

import { contactSchema } from "@/libs/hookform";
import useSelectedValuesFromHookForm from "@/hooks/useSelectedValuesFromHookForm";
import { useUserSlice } from "@/slices/user.slice";
import { usePostContactMsgMutationMutation } from "@/apis/contactApi";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiRequest";

import PrimaryInput from "@/components/atom/PrimaryInput";
import PrimaryTextArea from "@/components/atom/PrimaryTextArea";
import PrimaryButton from "@/components/atom/PrimaryButton";
import Header from "@/components/molecules/Header";

const contact = () => {
	const { register, handleSubmit, reset } = useSelectedValuesFromHookForm(contactSchema);
	const [postContactMsg, { isLoading, data, error }] = usePostContactMsgMutationMutation();
	const { user } = useSelector(useUserSlice);

	async function sendContactMsg(data: any) {
		const { message, title, email, ticket } = data;
		postContactMsg({ message, title, email, ticket });
	}

	useEffect(() => {
		if (!data) return;
		toast.success("Contact message sent successfully", { autoClose: 1500 });
		reset();
	}, [data]);

	useCreateErrorFromApiRequest(error);

	useEffect(() => {
		if (!user.email) return;
		reset({ email: user?.email });
	}, [user]);
	return (
		<div>
			<Header />
			{
				<div className="flex items-center justify-center flex-col pt-8">
					<h1 className="text-2xl md:text-4xl uppercase font-medium">Contact Us</h1>
					<form action="" className="newProduct w-full px-4 max-w-[720px] h-auto mt-6 flex flex-col items-center justify-center" onSubmit={handleSubmit(sendContactMsg)}>
						<PrimaryInput name="title" placeholder="" register={register} label="Title" />

						<div className="flex flex-col md:flex-row justify-between w-full md:gap-4">
							<PrimaryInput name="email" placeholder="" register={register} label="Email" />
							<PrimaryInput name="ticket" placeholder="" register={register} label="Ticket ID(optional)" labelsx="!text-slate-500" />
						</div>

						<PrimaryTextArea name="message" placeholder="" label="Contact Msg" register={register} sx="!h-64" />

						<PrimaryButton text="Send Contact" type="submit" sx="mt-4 max-w-[400px] h-16 md:h-20" disabled={isLoading} />
					</form>
					<ToastContainer />
				</div>
			}
		</div>
	);
};

export default contact;
