import React, { useEffect } from "react";
import Image from "next/image";

import { useDeleteAFileRequestMutation } from "@/apis/filesApi";

import { Loading1 } from "@/components/atom/Loading";

import { BsTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiRequest";

const ProductFormImageComponent = ({
	url,
	public_id,
	setImages,
	images,
}: {
	url: string;
	public_id: string;
	setImages: React.Dispatch<React.SetStateAction<{ url: string; public_id: string }[]>>;
	images: { url: string; public_id: string }[];
}) => {
	const [deleteAFile, { error, data, isLoading }]: any = useDeleteAFileRequestMutation();

	useEffect(() => {
		if (!data) return;
		toast.success("Image deleted successfully", { autoClose: 1500 });

		// Filter images
		setTimeout(() => {
			setImages((prev) => prev.filter((img) => img?.public_id !== public_id));
		}, 1500);
	}, [data]);

	// Create an error toast if any
	useCreateErrorFromApiRequest(error);
	return (
		<div className="w-full h-full bg-[#F5F2EC] relative hover:cursor-pointer">
			<Image src={url} alt="Product Image" fill />
			<button
				className="w-8 h-8 bg-slate-200 text-[red] flex items-center justify-center absolute z-10 bottom-0 right-0"
				type="button"
				onClick={() => {
					if (images?.length === 1) {
						toast.error("You are not allowed to have no uploaded images", { autoClose: 1500 });
						return;
					}
					deleteAFile({ public_id });
				}}>
				{!isLoading && <BsTrashFill />}
				{isLoading && <Loading1 />}
			</button>
		</div>
	);
};

export default ProductFormImageComponent;
