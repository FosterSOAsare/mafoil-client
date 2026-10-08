import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { useLazyGetPendingProductReviewsRequestQuery, useModerateProductReviewRequestMutation } from "@/apis/reviewsApi";
import { createDateFromString } from "@/utils/createDate";
import { useUserSlice } from "@/slices/user.slice";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiRequest";
import { Loading1 } from "@/components/atom/Loading";

import AdminLayout from "@/components/layouts/admin.layout";
import Ratings from "@/components/molecules/Ratings";

const ReviewCard = ({ rating, name, createdAt, comment, title, _id }: any) => {
	const [moderateProductReview, { data, isLoading, error }] = useModerateProductReviewRequestMutation();
	const [choice, setChoice] = useState("");
	useEffect(() => {
		if (!data) return;
		toast.success("Review was successfully moderated", { autoClose: 1500 });

		setTimeout(() => {
			window.location.reload();
		}, 2000);
	}, [data]);
	return (
		<div className="w-full border mb-6 min-h-36 p-6">
			<div className="w-full flex gap-2">
				<Ratings rating={rating} />
				<p className="text-slate-400 text-sm">
					{name} on {createDateFromString(createdAt)}
				</p>
			</div>

			<h3 className="font-medium text-lg mt-2">{title}</h3>
			<p className="text-sm mt-2">{comment}</p>

			<div className="flex justify-start w-1/5 mt-3 ml-auto h-10 gap-2">
				<button
					className="w-1/2 flex items-center justify-center hover:cursor-pointer opacity-80 hover:opacity-100 bg-[green] text-white"
					disabled={isLoading}
					onClick={() => {
						if (isLoading) return;
						setChoice("accepted");
						moderateProductReview({ _id: _id, status: "accepted" });
					}}>
					{(choice !== "accepted" || !isLoading) && <p>Accept</p>}
					{isLoading && choice === "accepted" && <Loading1 />}
				</button>
				<button
					className="w-1/2 flex items-center justify-center hover:cursor-pointer opacity-80 hover:opacity-100 bg-[red] text-white"
					disabled={isLoading}
					onClick={() => {
						if (isLoading) return;
						setChoice("rejected");
						moderateProductReview({ _id: _id, status: "rejected" });
					}}>
					{(choice !== "rejected" || !isLoading) && <p>Reject</p>}
					{isLoading && choice === "rejected" && <Loading1 />}
				</button>
			</div>
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
			<h3 className="uppercase text-center text-2xl font-medium">Reviews</h3>
			{reviews?.length > 0 && reviews?.map((review: any, index: number) => <ReviewCard {...review} key={index} />)}
			{reviews?.length === 0 && (
				<div className="flex items-center justify-center w-full mt-8">
					<p className="text-slate-400"> There is nothing here ...</p>
				</div>
			)}
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
