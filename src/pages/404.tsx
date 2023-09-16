import React from "react";
import Link from "next/link";

import Header from "@/components/molecules/Header";
import Footer from "@/components/molecules/Footer";

import { BsArrowRight } from "react-icons/bs";

const NotFoundPage = () => {
	return (
		<>
			<Header />
			<main className="w-full h-auto pt-24 pb-12 flex justify-center items-center flex-col min-h-screen">
				<h1 className="font-medium leading-[250px] text-[300px]">404 </h1>
				<h3 className="font-medium text-4xl">Oops! That page can't be found.</h3>
				<div className="w-[150px] h-[2px] my-6 bg-black bg-opacity-40"></div>
				<p className="w-[350px] text-center opacity-60">We're really sorry but we can't seem to find the page you were looking for.</p>
				<Link
					href="/"
					className="flex justify-between items-center hover:bg-transparent gap-2 bg-black hover:border-[2px] font-medium border-black hover:text-black py-4 px-12 tracking-[2px] uppercase text-white mt-6">
					Back To Homepage
					<BsArrowRight />
				</Link>
			</main>
			<Footer />
		</>
	);
};

export default NotFoundPage;
