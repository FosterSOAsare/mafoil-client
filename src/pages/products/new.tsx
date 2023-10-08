import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import { useUserSlice } from "@/slices/user.slice";
import { productSchema } from "@/libs/hookform";
import useSelectedValuesFromHookForm from "@/hooks/useSelectedValuesFromHookForm";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiRequest";
import { stores } from "@/data/newproduct.helpers";
import filters from "@/data/productfilters";
import { usePostAProductRequestMutation } from "@/apis/productsApi";
import useUploadAnImageHook from "@/hooks/useUploadAnImageHook";

import MainPageLayout from "@/components/layouts/mainpage.layout";
import PrimaryInput from "@/components/atom/PrimaryInput";
import PrimaryButton from "@/components/atom/PrimaryButton";
import PrimaryTextArea from "@/components/atom/PrimaryTextArea";
import PrimarySelect from "@/components/atom/PrimarySelect";
import { Loading1 } from "@/components/atom/Loading";
import NotFound from "@/components/NotFound";
import ProductFormImageComponent from "@/components/pages/Product/ProductFormImageComponent";

const NewProduct = () => {
	const { register, handleSubmit, reset } = useSelectedValuesFromHookForm(productSchema);
	const [postAProductRequest, { error, data, isLoading }] = usePostAProductRequestMutation();
	const { push } = useRouter();
	const { user } = useSelector(useUserSlice);
	const [images, setImages] = useState<{ url: string; public_id: string }[]>([]);
	const [notFound, setNotFound] = useState(false);
	const { storeImage, fileUploadLoading, fileUploadError } = useUploadAnImageHook((data: any) => setImages((prev) => [...prev, data]));

	function storeNewProduct(data: any) {
		let { name, price, category, store, long_desc, short_desc } = data;
		if (images?.length === 0) {
			toast.error("Please upload product images");
			return;
		}
		let parsedNumber: number = parseFloat(price);
		parsedNumber = Math.round(parsedNumber * 100) / 100;

		postAProductRequest({ name, price: parsedNumber, category, store, long_desc, short_desc, images });
	}
	// Create toastify to notify errors
	useCreateErrorFromApiRequest(error);
	useCreateErrorFromApiRequest(fileUploadError);

	useEffect(() => {
		if (!user?.is_admin) {
			setNotFound(true);
			return;
		}
		setNotFound(false);
	}, [user]);

	function deleteImage() {}
	useEffect(() => {
		if (!data) return;
		reset();
		toast("Prooduct Created Successfully");
		setTimeout(() => {
			push(`/products/${data?.slugname}`);
		}, 2000);
	}, [data]);

	return (
		<MainPageLayout>
			{!notFound && (
				<>
					<h1 className="text-4xl uppercase font-medium">New Product</h1>
					<form action="" className="newProduct w-full max-w-[720px] h-auto mt-6 flex flex-col items-center justify-center" onSubmit={handleSubmit(storeNewProduct)}>
						<PrimaryInput name="name" placeholder="Brims hats for men" register={register} label="Product Name" />
						<PrimaryInput name="price" placeholder="100.00" register={register} label="Product Price" />

						<div className="w-full flex justify-between gap-4 items-center">
							<PrimarySelect name="category" label="Category" register={register} options={filters} />
							<PrimarySelect name="store" label="Store" register={register} options={stores} />
						</div>
						<PrimaryTextArea name="short_desc" placeholder="" label="Short Description (255 characters max) " register={register} />
						<PrimaryTextArea name="long_desc" placeholder="" label="Long Description(optional)" register={register} sx="!h-64" />

						<div className="w-full h-24 mb-4 grid gap-8 grid-cols-4">
							{images.map((image, index) => (
								<ProductFormImageComponent key={index} {...image} setImages={setImages} images={images} />
							))}
							{images?.length < 4 && (
								<div className="w-full h-full ">
									<input type="file" id="image" className="hidden" onChange={storeImage} />
									<label
										htmlFor="image"
										className={`text-white hover:cursor-pointer hover:bg-brown opacity-80 hover:opacity-100 w-full flex items-center justify-center h-full ${
											fileUploadLoading ? "bg-brown" : "bg-black"
										} flex-col`}>
										{!fileUploadLoading && (
											<>
												+<p> Add Image</p>
											</>
										)}
										{fileUploadLoading && <Loading1 />}
									</label>
								</div>
							)}
						</div>

						<PrimaryButton text="Create Product" type="submit" disabled={isLoading} />
					</form>
					<ToastContainer />
				</>
			)}

			{notFound && <NotFound />}
		</MainPageLayout>
	);
};

export default NewProduct;
