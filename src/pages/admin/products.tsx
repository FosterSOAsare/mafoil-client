import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Image from "next/image";
import Link from "next/link";

import { productType } from "@/types/product.type";
import { useLazyGetProductsRequestQuery } from "@/apis/productsApi";

import AdminLayout from "@/components/layouts/admin.layout";
import Ratings from "@/components/molecules/Ratings";
import Loading from "@/components/atom/Loading";

import { HiOutlineDotsVertical } from "react-icons/hi";
import AdminProductCard from "@/components/pages/Admin/AdminProductCard";

const products = () => {
	const [products, setProducts] = useState<productType[]>([]);
	const [previewProduct, setPreviewProduct] = useState<null | productType>(null);

	const [getProductsRequest, { data, isLoading, error }] = useLazyGetProductsRequestQuery();

	useEffect(() => {
		// if (!selectedFilter) return;
		getProductsRequest({ category: "all", size: "all" });
	}, []);

	useEffect(() => {
		if (!data) return;
		setProducts(data?.data);
	}, [data]);
	return (
		<AdminLayout>
			<main className="w-full min-h-screen relative">
				<section className="w-full bg- flex items-center justify-center flex-col " id="hero">
					<h1 className="text-4xl mb-2 font-medium">PRODUCTS</h1>

					<div className="bg-[#14C100] h-2 w-1/3 rounded-[5px]"></div>

					<Link
						href="/products/new"
						className="border-black flex items-center justify-center ml-auto mt-4 border hover:border-brown text-black hover:text-white relative group h-12 px-5 overflow-hidden">
						<span className="w-full h-full bg-brown absolute transition-all duration-300 top-0 group-hover:left-0 z-1 -left-full"></span>
						<p className="relative z-2 transition-all duration-75 group-hover:text-white uppercase text-[12px] font-medium">New Product</p>
					</Link>
				</section>

				<section id="products" className="px-10 py-4 h-auto mt-8 w-full gap-6 justify-between">
					{isLoading && (
						<div className="w-full h-[60vh] flex items-center justify-center">
							<Loading sx="w-8! h-8!" />
						</div>
					)}

					{!isLoading && (
						<>
							{products?.length > 0 && (
								<article className="w-full flex flex-col items-center max-w-5xl mx-auto justify-center">
									<div className="w-full font-medium h-auto pb-3 flex items-center justify-between border-b">
										<p className="w-1/3">PRODUCT</p>
										<p className="w-1/5 text-center">PRICE</p>

										<p className="w-1/5 text-center">RATING(S)</p>
										<div className="w-8 h-8"></div>
									</div>
									{products?.map((product: productType, index: number) => (
										<AdminProductCard key={index} {...product} />
									))}
								</article>
							)}

							{products?.length === 0 && <p className="text-center">Your products is currently empty.</p>}
						</>
					)}
				</section>

				<ToastContainer />
			</main>
		</AdminLayout>
	);
};

export default products;
