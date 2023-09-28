import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import useSelectedValuesFromHookForm from "@/hooks/useSelectedValuesFromHookForm";
import { reviewProductSchema } from "@/libs/hookform";
import { usePostProductReviewRequestMutation } from "@/apis/productsApi";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiRequest";

import PrimaryInput from "@/components/atom/PrimaryInput";
import PrimaryTextArea from "@/components/atom/PrimaryTextArea";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const ReviewForm = ({ slugname, setShowReviewForm }: { slugname: string; setShowReviewForm: React.Dispatch<React.SetStateAction<boolean>> }) => {
	const { register, handleSubmit, reset } = useSelectedValuesFromHookForm(reviewProductSchema);
	const [rating, setRating] = useState(0);

	const [postReview, { error, data, isLoading }] = usePostProductReviewRequestMutation();

	const sendReview = async (data: any) => {
		let { comment, title } = data;
		postReview({ slugname, data: { comment, title, rating } });
	};

	useEffect(() => {
		if (!data) return;
		toast.success("Review has been received and is pending approval", { autoClose: 1500 });
		setTimeout(() => {
			reset();
			setShowReviewForm(false);
		}, 500);
	}, [data]);

	// Create error log for project
	useCreateErrorFromApiRequest(error);
	return (
		<form className="mt-4 w-full h-auto" onSubmit={handleSubmit(sendReview)}>
			<h1 className="text-2xl font-medium">Write a review</h1>

			<div className="flex gap-2 mb-4  items-center">
				<p>Rating</p>
				<div className="mt-2">
					{[1, 2, 3, 4, 5].map((item, index) => (
						<button key={index} onClick={() => setRating(item)} type="button" className="text-xl">
							{item <= rating ? <AiFillStar key={index} className="text-[#FFA422]" /> : <AiOutlineStar key={index} className="text-black" />}
						</button>
					))}
				</div>
			</div>
			<PrimaryInput name="title" placeholder="Give your review a title" register={register} label="Review Title" sx="!py-2 mt-2 !border-slate-200 !text-sm" labelsx="!font-[400]" />
			<PrimaryTextArea
				name="comment"
				placeholder="Write your comment here"
				register={register}
				label={`Body Of Review`}
				divsx="mt-2 !py-2 !border-slate-200 !text-sm"
				sx="h-[400px]"
				labelsx="!font-[400]"
			/>

			<button
				type="submit"
				className={`mt-4 !w-[220px] flex items-center justify-center bg-transparent hover:border-brown text-black border-[1px] mx-auto border-black relative group h-16 overflow-hidden`}>
				<span className={`w-full h-full bg-brown -left-[100%] absolute transition-all duration-300 top-0 group-hover:-left-0 z-[1] `}></span>
				<p className="relative z-[2] transition-all duration-75 group-hover:text-white uppercase text-sm font-medium">Submit Review</p>
			</button>
		</form>
	);
};

export default ReviewForm;
