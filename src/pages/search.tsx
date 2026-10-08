import React, { useEffect, useState } from "react";
import MainPageLayout from "@/components/layouts/mainpage.layout";
import { useLazySearchProductQuery } from "@/apis/productsApi";
import useDebounce from "@/hooks/useDebounce";
import ProductCard from "@/components/cards/ProductCard";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiRequest";
import { productType } from "@/types/product.type";
import Loading from "@/components/atom/Loading";
import ProductQuickView from "@/components/pages/Homepage/ProductQuickView";

const search = () => {
	const [searchProduct, { data: products, error, isError, isLoading }] = useLazySearchProductQuery();
	const [search, setSearch] = useState("");
	const searchText = useDebounce(search, 1000);

	const [previewProduct, setPreviewProduct] = useState<null | productType>(null);

	useEffect(() => {
		// if (!searchText) return;
		searchProduct({ searchText });
	}, [searchText]);

	useCreateErrorFromApiRequest(error);
	return (
		<MainPageLayout>
			<>
				<div className="w-4/5 md:w-full md:max-w-2xl mx-auto rounded-full hover:border-black  overflow-hidden h-12 border-2">
					<input
						type="text"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="w-full h-full border-0 focus:outline-0  bg-transparent text-center px-3"
						placeholder="Search products"
					/>
				</div>

				<section id="products" className="px-4 md:px-10 py-4 lg:py-12 h-auto mt-8 w-full flex flex-col lg:flex-row items-start gap-6 justify-between">
					{!isLoading && (
						<article className={`w-full flex max-w-4xl mx-auto flex-col items-center justify-center  ${products ? "border-b" : ""} pb-8 lg:pb-36`}>
							<div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center lg:grid-cols-3 gap-6 w-full h-auto">
								{products?.map((product: productType, index: number) => {
									return <ProductCard key={index} product={product} setPreviewProduct={setPreviewProduct} sx="h-[320px]!" />;
								})}
							</div>
							{previewProduct && <ProductQuickView setPreviewProduct={setPreviewProduct} previewProduct={previewProduct} />}
						</article>
					)}
					{isLoading && (
						<div className="w-full h-[50vh] flex items-center justify-center">
							<Loading />
						</div>
					)}
				</section>
			</>
		</MainPageLayout>
	);
};

export default search;
