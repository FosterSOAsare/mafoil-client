import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { productType } from "@/types/product.type";

import Ratings from "../molecules/Ratings";

import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";

const ProductCard = ({ product, setPreviewProduct, sx = "" }: { product: productType; setPreviewProduct: React.Dispatch<React.SetStateAction<productType | null>>; sx?: string }) => {
	const { name, price, rating, totalRatings, images, slugName } = product;
	const [showContent, setShowContent] = useState(false);
	return (
		<article className="w-full h-auto bg-white ">
			<div className={`w-full h-[400px] ${sx} overflow-hidden`}>
				<div
					className="w-full h-full relative overflow-hidden hover:cursor-pointer"
					onMouseEnter={() => setShowContent(true)}
					onMouseLeave={() => {
						setShowContent(false);
					}}>
					<div className="w-full h-full bg-[#F5F2EC] relative">
						<Image src={images[0]} fill alt="product Image" />
					</div>
					<aside className="absolute top-4 right-4  w-auto h-auto">
						<button
							className={`w-8 h-8 bg-white transition-all duration-300 hover:bg-brown hover:text-white ${
								showContent ? "scale-100" : "scale-0"
							} text-black mb-2 flex items-center justify-center`}>
							<AiOutlineHeart className="text-lg" />
						</button>
						<button
							className={`${
								showContent ? "scale-100" : "scale-0"
							} w-8 h-8 bg-white transition-all duration-300 delay-100 hover:bg-brown hover:text-white text-black flex items-center justify-center`}>
							<AiOutlineShoppingCart className="text-lg" />
						</button>
					</aside>
					<aside className={`absolute ${showContent ? "bottom-4" : "-bottom-[20%]"} transition-all duration-300 w-[93%] left-0 gap-4 right-0 mx-auto flex items-center h-12`}>
						<Link href={`/products/${slugName}`} className="bg-[white] flex items-center justify-center  text-black relative w-1/2 group h-full overflow-hidden">
							<span className="w-full h-full bg-brown absolute transition-all duration-300 top-0 group-hover:left-0 z-[1] -left-[100%]"></span>
							<p className="relative z-[2] transition-all duration-75 group-hover:text-white uppercase text-[12px] font-medium">View Product</p>
						</Link>
						<button className="bg-[white]  text-black relative w-1/2 group h-full overflow-hidden" onClick={() => setPreviewProduct(product)}>
							<span className="w-full h-full bg-brown absolute transition-all duration-300 top-0 group-hover:left-0 z-[1] -left-[100%]"></span>
							<p className="relative z-[2] transition-all duration-75 group-hover:text-white uppercase text-[12px] font-medium">Quickview</p>
						</button>
					</aside>
				</div>
			</div>
			<div className="h-[150px] flex items-center shadow-md justify-center flex-col">
				<Ratings rating={rating} totalRatings={totalRatings} />
				<Link href="/" className="text-sm my-2">
					{name}
				</Link>
				<p className="text-brown font-medium">GH₵{price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
			</div>
		</article>
	);
};

export default ProductCard;
