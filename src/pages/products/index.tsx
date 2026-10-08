import Head from "next/head";
import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";

import filters from "@/data/productfilters";
import { productType } from "@/types/product.type";
import { useLazyGetProductsRequestQuery } from "@/apis/productsApi";
import { useGetCategoriesDataRequestQuery } from "@/apis/productsApi";

import Header from "@/components/molecules/Header";
import ProductCard from "@/components/cards/ProductCard";
import Footer from "@/components/molecules/Footer";
import ProductQuickView from "@/components/pages/Homepage/ProductQuickView";
import Loading from "@/components/atom/Loading";

const Products = () => {
	const { query, isReady } = useRouter();

	const [selectedFilter, setSelectedFilter] = useState("");
	const [products, setProducts] = useState<{ data: productType[]; nextPage: boolean }>({ data: [], nextPage: false });
	const { data: categoriesData } = useGetCategoriesDataRequestQuery();
	const [getProductsRequest, { data, isLoading, error }] = useLazyGetProductsRequestQuery();
	const [page, setPage] = useState(1);

	const [previewProduct, setPreviewProduct] = useState<null | productType>(null);

	useEffect(() => {
		if (!selectedFilter) return;
		getProductsRequest({ page, category: selectedFilter });
	}, [page, selectedFilter]);

	useEffect(() => {
		if (!data) return;
		setProducts((prev) => (page !== 1 ? { data: [...prev?.data, ...data?.data], nextPage: data.nextPage } : data));
	}, [data]);

	useEffect(() => {
		if (!isReady) return;
		const type = query?.type as string;
		setSelectedFilter(type ? type : "all");
	}, [query, isReady]);
	return (
		<>
			<Head>
				<title>Mafo.il - Shop With Us</title>

				<meta name="description" content="Products page of mafo.il" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<main className="w-full min-h-screen  bg-white relative">
				<section className="w-full h-[20vh] lg:h-[40vh]  flex items-center justify-center flex-col  product-hero" id="hero">
					<h1 className="text-4xl mb-4 font-medium">PRODUCTS</h1>

					<nav className="flex items-center justify-start gap-2 text-sm">
						{[{ name: "Home", link: "/" }].map((crumb, index, arr) => (
							<Fragment key={index}>
								<Link href={crumb?.link} className="hover:text-brown">
									{crumb.name}
								</Link>
								<p>&gt;</p>
							</Fragment>
						))}
						<p>Products</p>
					</nav>
				</section>

				<section id="products" className="px-4 md:px-10 py-4 lg:py-12 h-auto mt-8 w-full flex flex-col lg:flex-row items-start gap-6 justify-between">
					<article className="w-full hidden lg:block lg:w-1/5 h-auto">
						<div className="w-full flex items-center justify-between">
							<p className="text-xl">Collections</p>
						</div>
						<div id="breadcrumbs" className="w-full mt-4 h-auto">
							{filters.map((filter, index) => {
								let count = 0;
								if (categoriesData) {
									count = categoriesData[filter?.option];
								}

								return (
									<button
										key={index}
										className={`font-medium text-md w-full mb-2 flex justify-between items-center hover:text-brown ${selectedFilter === filter.option ? "text-brown" : ""}`}
										onClick={() => {
											setSelectedFilter(filter.option);
											setPage(1);
										}}>
										<p>{filter.name}</p>
										<p className="text-sm">({count})</p>
									</button>
								);
							})}
						</div>
					</article>
					<div id="breadcrumbs" className="w-full mb-8 h-auto lg:hidden flex items-center gap-4">
						{filters.map((filter, index) => (
							<React.Fragment key={index}>
								<button
									className={`font-medium text-[12px] md:text-md block  hover:text-brown ${selectedFilter === filter.option ? "text-brown" : ""}`}
									onClick={() => {
										setSelectedFilter(filter.option);
										setPage(1);
									}}>
									{filter.name}
								</button>
								{index !== filters?.length - 1 && <p>/</p>}
							</React.Fragment>
						))}
					</div>
					{!isLoading && (
						<article className="w-full lg:w-4/5 flex flex-col items-center justify-center  border-b pb-8 lg:pb-36">
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full h-auto">
								{products?.data.map((product, index) => {
									return <ProductCard key={index} product={product} setPreviewProduct={setPreviewProduct} sx="h-[320px]!" />;
								})}
							</div>
							{products?.nextPage && (
								<button
									className="bg-[white] w-full text-black relative mt-16 md:w-[400px] lg:w-[200px] hover:border-brown border-black h-16 group border overflow-hidden"
									onClick={() => setPage((prev) => ++prev)}>
									<span className="w-full h-full bg-brown absolute transition-all duration-200 top-0 group-hover:left-0 z-1 -left-full"></span>
									<p className="relative z-2 transition-all duration-75 group-hover:text-white uppercase  font-medium text-sm">load more</p>
								</button>
							)}
						</article>
					)}
					{isLoading && (
						<div className="w-full h-[50vh] flex items-center justify-center">
							<Loading />
						</div>
					)}
				</section>

				{previewProduct && <ProductQuickView setPreviewProduct={setPreviewProduct} previewProduct={previewProduct} />}
			</main>
			<Footer />
			<ToastContainer />
		</>
	);
};

export default Products;
