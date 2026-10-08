import Head from "next/head";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Link from "next/link";

import filters from "@/data/productfilters";
import { productType } from "@/types/product.type";
import { useLazyGetProductsRequestQuery } from "@/apis/productsApi";

import Header from "@/components/molecules/Header";
import ProductCard from "@/components/cards/ProductCard";
import Testimonials from "@/components/pages/Homepage/Testimonials";
import Footer from "@/components/molecules/Footer";
import ProductQuickView from "@/components/pages/Homepage/ProductQuickView";
import Loading from "@/components/atom/Loading";

export default function Home() {
	const [selectedFilter, setSelectedFilter] = useState("all");
	const [products, setProducts] = useState<{ data: productType[]; nextPage: boolean }>({ data: [], nextPage: false });
	const [page, setPage] = useState(1);
	const [getProductsRequest, { data, isFetching: isLoading, error }] = useLazyGetProductsRequestQuery();

	const [previewProduct, setPreviewProduct] = useState<null | productType>(null);

	useEffect(() => {
		if (!selectedFilter) return;
		getProductsRequest({ page, category: selectedFilter });
	}, [page, selectedFilter]);

	useEffect(() => {
		if (!data) return;
		setProducts((prev) => (page !== 1 ? { data: [...prev?.data, ...data?.data], nextPage: data.nextPage } : data));
	}, [data]);
	return (
		<>
			<Head>
				<title>Maf.oil - Buy your shirts here</title>
				<meta name="description" content="Mafoil homepage" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<main className="w-full min-h-screen bg-white relative">
				<section className="w-full h-[40vh] lg:h-screen px-6 bg-white" id="hero">
					<div className="w-full h-full hero_image relative">
						<div className="w-[120px] md:w-[250px] absolute top-[10vh] lg:top-[30vh] right-4 md:right-8 h-auto">
							<h3 className="text-right text-sm md:text-xl mb-3 uppercase tracking-[5px] text-brown">Big Sale !</h3>
							<h1 className="text-2xl md:text-5xl text-right font-medium md:leading-[65px]">TRENDING OUTFITS</h1>
							<Link
								href="/products"
								className="bg-brown flex items-center justify-center text-white relative mt-4 md:mt-8 w-full hover:border-white border-brown h-12 md:h-20 lg:h-16 group border overflow-hidden">
								<span className="w-full h-full bg-white absolute transition-all duration-200 top-0 group-hover:right-0 z-1 -right-full"></span>
								<p className="relative z-2 transition-all duration-75 group-hover:text-black uppercase  font-medium text-sm">Shop Now</p>
							</Link>
						</div>
					</div>
				</section>

				<section id="products" className="px-4 md:px-6 w-full h-auto mt-8">
					<div id="breadcrumbs" className="w-full mb-8 h-auto flex items-center gap-4">
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

					<article id="products" className="flex flex-col items-center justify-center w-full border-b pb-12 md:pb-36">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full h-auto">
							{products?.data.map((product, index) => {
								return <ProductCard key={index} product={product} setPreviewProduct={setPreviewProduct} />;
							})}
						</div>
						{products?.nextPage && (
							<button
								className="bg-[white]  text-black relative mt-16 md:w-[400px] lg:w-[200px] hover:border-brown border-black h-20 lg:h-16 group border overflow-hidden"
								disabled={isLoading}
								onClick={() => setPage((prev) => ++prev)}>
								<span className="w-full h-full bg-brown absolute transition-all duration-200 top-0 group-hover:left-0 z-1 -left-full"></span>
								{!isLoading && <p className="relative z-2 transition-all duration-75 group-hover:text-white uppercase  font-medium text-sm">load more</p>}
								{isLoading && <Loading sx="w-8! h-8! mx-auto" />}
							</button>
						)}
					</article>
				</section>

				{previewProduct && <ProductQuickView setPreviewProduct={setPreviewProduct} previewProduct={previewProduct} />}

				<Testimonials />
				<ToastContainer />
			</main>
			<Footer />
		</>
	);
}
