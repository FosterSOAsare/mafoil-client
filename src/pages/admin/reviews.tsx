import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import { useLazyGetPendingProductReviewsRequestQuery, useModerateProductReviewRequestMutation } from "@/apis/reviewsApi";
import { createDateFromString } from "@/utils/createDate";
import { useUserSlice } from "@/slices/user.slice";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiRequest";
import { Loading1 } from "@/components/atom/Loading";

import AdminLayout from "@/components/layouts/admin.layout";
import Ratings from "@/components/molecules/Ratings";

const ReviewCard = ({ rating, name, createdAt, comment, title, _id }: any) => {
	const [moderateProductReview, { data, isLoading, error }] = useModerateProductReviewRequestMutation();
	useEffect(() => {
		if (!data) return;
		toast.success("Review was successfully moderated", { autoClose: 1500 });

		setTimeout(() => {
			window.location.reload();
		}, 2000);
	}, [data]);
	return (
		<div className="w-full border-[1px] mb-6 min-h-36 p-6">
			<div className="w-full flex gap-2">
				<Ratings rating={rating} />
				<p className="text-slate-400 text-sm">
					{name} on {createDateFromString(createdAt)}
				</p>
			</div>

			<h3 className="font-medium text-lg mt-2">{title}</h3>
			<p className="text-sm mt-2">{comment}</p>

			{!isLoading && (
				<div className="flex justify-start w-1/5 mt-3 ml-auto h-10 gap-2">
					<button className="w-1/2 hover:cursor-pointer opacity-80 hover:opacity-100 bg-[green] text-white" onClick={() => moderateProductReview({ _id: _id, status: "accepted" })}>
						Accept
					</button>
					<button className="w-1/2 hover:cursor-pointer opacity-80 hover:opacity-100 bg-[red] text-white" onClick={() => moderateProductReview({ _id: _id, status: "rejected" })}>
						Reject
					</button>
				</div>
			)}
		</div>
	);
};
const Reviews = () => {
	const { user } = useSelector(useUserSlice);

	const [getPendingReviews, { data: reviews, isLoading: reviewsLoading, error: reviewsError }] = useLazyGetPendingProductReviewsRequestQuery();

	useEffect(() => {
		getPendingReviews();
	}, []);

	// Create Error Messages
	useCreateErrorFromApiRequest(reviewsError);
	return (
		<main>
			{reviews?.length && reviews?.map((review: any, index: number) => <ReviewCard {...review} key={index} />)}
			<ToastContainer />
		</main>
	);
};

const index = () => {
	return (
		<AdminLayout>
			<Reviews />
		</AdminLayout>
	);
};

export default index;
