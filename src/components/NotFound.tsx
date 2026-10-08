import React from "react";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
const NotFound = () => {
	return (
		<main className="w-full h-auto pt-8 md:pt-16 lg:pt-24 pb-12 flex justify-center items-center flex-col lg:min-h-screen">
			<h1 className="font-medium md:leading-[250px] text-[150px] lg:text-[300px]">404 </h1>
			<h3 className="font-medium text-2xl md:text-4xl text-center">Oops! That page can't be found.</h3>
			<div className="w-[150px] h-[2px] my-6 bg-black bg-opacity-40"></div>
			<p className="w-[350px] text-center opacity-60">We're really sorry but we can't seem to find the page you were looking for.</p>
			<Link
				href="/"
				className="flex justify-between items-center hover:bg-transparent gap-2 bg-black border-2 font-medium border-black hover:text-black py-4 px-12 tracking-[2px] uppercase text-white mt-6">
				Back To Homepage
				<BsArrowRight />
			</Link>
		</main>
	);
};

export default NotFound;
