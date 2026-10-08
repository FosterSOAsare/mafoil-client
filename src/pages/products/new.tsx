import React, { useEffect, useState } from "react";
import Head from "next/head";
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
	const [title, setTitle] = useState("");
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
			setTitle("404 - Page Not Found");
			setNotFound(true);
			return;
		}
		setTitle("Mafo.il - Create New Product");
		setNotFound(false);
	}, [user]);

	useEffect(() => {
		if (!data) return;
		reset();
		toast("Product Created Successfully");
		setTimeout(() => {
			push(`/products/${data?.slugname}`);
		}, 2000);
	}, [data]);

	return (
		<MainPageLayout>
			<Head>
				<title>{title}</title>
			</Head>
			{!notFound && (
				<>
					<h1 className="text-2xl md:text-4xl uppercase font-medium">New Product</h1>
					<form action="" className="newProduct w-full px-4 max-w-[720px] h-auto mt-6 flex flex-col items-center justify-center" onSubmit={handleSubmit(storeNewProduct)}>
						<PrimaryInput name="name" placeholder="Brims hats for men" register={register} label="Product Name" />
						<PrimaryInput name="price" placeholder="100.00" register={register} label="Product Price" />

						<div className="w-full flex flex-col md:flex-row justify-between md:gap-4 items-center">
							<PrimarySelect name="category" label="Category" register={register} options={filters} />
							<PrimarySelect name="store" label="Store" register={register} options={stores} />
						</div>
						<PrimaryTextArea name="short_desc" placeholder="" label="Short Description (255 characters max) " register={register} />
						<PrimaryTextArea name="long_desc" placeholder="" label="Long Description(optional)" register={register} sx="h-64!" />

						<div className="w-full h-16 md:h-28 mb-4 grid gap-8 grid-cols-4">
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
												+<p className="hidden md:block"> Add Image</p>
											</>
										)}
										{fileUploadLoading && <Loading1 />}
									</label>
								</div>
							)}
						</div>

						<PrimaryButton text="Create Product" type="submit" sx="mt-4 max-w-[400px] h-16 md:h-20" disabled={isLoading} />
					</form>
					<ToastContainer />
				</>
			)}

			{notFound && <NotFound />}
		</MainPageLayout>
	);
};

export default NewProduct;
