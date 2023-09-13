import React, { useEffect, useState } from "react";
import Ratings from "@/components/molecules/Ratings";
import Image from "next/image";
import Link from "next/link";

import { productType } from "@/types/product.type";

import { AiOutlineClose } from "react-icons/ai";

const ProductQuickView = ({ setPreviewProduct, previewProduct }: { setPreviewProduct: React.Dispatch<React.SetStateAction<productType | null>>; previewProduct: productType }) => {
	const { name, author, images, price, rating, totalRatings, description, slugName } = previewProduct;

	const [show, setShow] = useState(false);

	function close() {
		setShow(false);
		setTimeout(() => {
			setPreviewProduct(null);
		}, 400);
	}

	useEffect(() => {
		setTimeout(() => {
			setShow(true);
		}, 200);
	}, []);
	return (
		<aside className={`${show ? "w-[70%]" : "w-[35%]"} flex transition-all duration-300 items-start shadow-md z-[3] justify-between h-[70vh] bg-white fixed top-0 bottom-0 m-auto left-0 right-0`}>
			<article className={`${!show ? "w-full max-w-[500px]" : "w-1/2 min-w-[450px]"} h-full relative`}>
				<Image src={images[0]} alt="Product Image" fill />
			</article>
			{show && (
				<article className="w-1/2 h-full bg-white p-4">
					<button className="w-8 h-8 bg-white flex items-center justify-center shadow-lg ml-auto mb-2 text-black rounded-full" onClick={close}>
						<AiOutlineClose />
					</button>
					<div className="border-r-[2px] border-black px-2">
						<Ratings rating={rating} totalRatings={totalRatings} />
						<div className="w-full h-auto pb-6 border-b-[1px]  mt-4">
							<h3 className="uppercase mb-2 text-xl font-medium">{name}</h3>
							<p className="mb-2">
								By <span className="underline hover:text-brown hover:cursor-pointer text-sm"> {author}</span>
							</p>

							<h4 className="text-brown text-xl font-medium">GH₵{price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h4>
						</div>
						<p className="mt-6">{description}</p>
					</div>

					{/* <div className="bg-[#F7EBEC] w-full h-12 mt-10 flex items-center gap-4">
						<div className="w-12 h-12 bg-[red]"></div>
						<p className="text-xl text-red-600">
							{"459d"}: {"12h"}: {"25m"}: {"26s"}
						</p>
					</div> */}

					<Link href={`/products/${slugName}`} className="bg-black flex items-center justify-center  text-white  mt-6  relative w-1/2  group h-12 overflow-hidden">
						<span className="w-full h-full bg-brown absolute transition-all duration-300 top-0 group-hover:left-0 z-[1] -left-[100%]"></span>
						<p className="relative z-[2] transition-all duration-75 group-hover:text-white uppercase text-[12px] font-medium">View Product</p>
					</Link>
				</article>
			)}
		</aside>
	);
};

export default ProductQuickView;
