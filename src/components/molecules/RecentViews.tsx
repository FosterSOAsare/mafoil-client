import React, { useState, useEffect } from "react";

import { productType } from "@/types/product.type";
import localProducts from "@/data/products";

import ProductCard from "../cards/ProductCard";
import { useRouter } from "next/router";

const RecentViews = ({ setPreviewProduct, product }: { setPreviewProduct: any; product: productType }) => {
	const [recentlyViewed, setRecentlyViewed] = useState<productType[]>([]);
	const { query } = useRouter();

	useEffect(() => {
		if (!product) return;
		let recents = localStorage.getItem("recents");
		let localRecents = recents ? [...JSON.parse(recents)].filter((product: string) => product != query?.slugName) : [];

		setRecentlyViewed(localProducts.filter((product, index) => localRecents.includes(product?.slugName)).filter((p, index) => index < 4));
		// Make sure it is always 5
		if (localRecents.length >= 5) {
			localRecents.shift();
		}

		// Add current product
		localRecents.push(product?.slugName);

		localStorage.setItem("recents", JSON.stringify(localRecents));
	}, [product]);
	return (
		<section id="recents" className="px-20 pb-12 pt-6 h-auto flex flex-col items-center justify-center w-full">
			<h3 className="text-center mb-8 text-3xl font-medium">RECENTLY VIEWED PRODUCTS</h3>
			<article className="w-full flex flex-col items-center justify-center pb-12">
				<div className="grid grid-cols-4 gap-6 w-full h-auto">
					{recentlyViewed.map((product, index) => {
						return <ProductCard key={index} product={product} setPreviewProduct={setPreviewProduct} sx="!h-[300px]" />;
					})}
				</div>
			</article>
		</section>
	);
};

export default RecentViews;
