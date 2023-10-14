import React, { useState, useEffect } from "react";

import { productType } from "@/types/product.type";

import ProductCard from "../cards/ProductCard";
import { useRouter } from "next/router";
import { useGetRecentProductsRequestMutation } from "@/apis/productsApi";

const RecentViews = ({ setPreviewProduct, product }: { setPreviewProduct: any; product: productType }) => {
	const [recentlyViewed, setRecentlyViewed] = useState<productType[]>([]);
	const { query } = useRouter();

	const [getRecentProducts, { data, error, isLoading }]: any = useGetRecentProductsRequestMutation();

	useEffect(() => {
		if (!product) return;
		let recents = localStorage.getItem("recents");
		let localRecents = recents ? [...JSON.parse(recents)].filter((product: string) => product != query?.slugName) : [];

		getRecentProducts(localRecents);
		if (!data) return;
		// Make sure it is always 5
		if (localRecents.length >= 5) {
			localRecents.shift();
		}

		// Add current product
		localRecents.push(product?.slugname);
		localStorage.setItem("recents", JSON.stringify(localRecents));
	}, [product]);

	useEffect(() => {
		setRecentlyViewed(data?.filter((item: productType, index: number) => item.slugname !== product.slugname).filter((item: productType, index: number) => index < 4));
	}, [data]);
	return (
		<>
			{recentlyViewed?.length > 0 && (
				<section id="recents" className="px-4 md;px-8 lg:px-20 pb-12 pt-6 h-auto flex flex-col items-center justify-center w-full">
					<h3 className="text-center mb-8 text-2xl md:text-3xl font-medium">RECENTLY VIEWED PRODUCTS</h3>
					<article className="w-full flex flex-col items-center justify-center pb-12">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full h-auto">
							{recentlyViewed.map((product, index) => {
								return <ProductCard key={index} product={product} setPreviewProduct={setPreviewProduct} sx="!h-[300px]" />;
							})}
						</div>
					</article>
				</section>
			)}
		</>
	);
};

export default RecentViews;
