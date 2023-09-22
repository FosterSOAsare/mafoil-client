import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { useUserSlice } from "@/slices/user.slice";
import { productType } from "@/types/product.type";
import useCheckIfProductIsInWishList from "@/hooks/useCheckIfProductIsInWishList";
import { toggleItemInWishList } from "@/slices/wishlist.slice";
import { increaseItemCount } from "@/slices/cart.slice";
import produceError from "@/utils/produceErrorIfUserIsNotLoggedIn";

import Ratings from "../molecules/Ratings";
import { Loading1 } from "../atom/Loading";

import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";

const ProductCard = ({ product, setPreviewProduct, sx = "" }: { product: productType; setPreviewProduct: React.Dispatch<React.SetStateAction<productType | null>>; sx?: string }) => {
	const { name, price, rating, totalRatings, images, slugname, _id } = product;
	const { user } = useSelector(useUserSlice);
	const [showContent, setShowContent] = useState(false);
	const partOfWishList = useCheckIfProductIsInWishList(product?._id as string);
	const dispatch = useDispatch();

	// For controlling the loading state
	const [addingToCart, setAddingToCart] = useState(false);

	function addToCart() {
		setAddingToCart(true);

		setTimeout(() => {
			dispatch(increaseItemCount({ product: product }));
			setAddingToCart(false);
			toast.success("Item successfully added to cart", { autoClose: 1500 });
		}, 2000);
	}

	return (
		<article className="w-full h-auto bg-white ">
			<div className={`w-full h-[400px] ${sx} overflow-hidden`}>
				<div className="w-full h-full relative overflow-hidden hover:cursor-pointer" onMouseEnter={() => setShowContent(true)} onMouseLeave={() => setShowContent(false)}>
					<div className="w-full h-full bg-[#F5F2EC] relative">
						<Image src={images[0]?.url} fill alt="product Image" />
					</div>
					<aside className="absolute top-4 right-4  w-auto h-auto">
						<button
							onClick={() => produceError(user?._id, dispatch(toggleItemInWishList({ wishlistItem: product })))}
							className={`w-8 h-8 transition-all duration-300 ${showContent ? "scale-100" : "scale-0"} ${
								partOfWishList ? "bg-brown hover:text-black  text-white" : "hover:bg-brown bg-white  text-black  hover:text-white"
							} mb-2 flex items-center justify-center`}>
							<AiOutlineHeart className="text-lg" />
						</button>
						<button
							onClick={() => produceError(user?._id, addToCart)}
							className={`${showContent ? "scale-100" : "scale-0"} w-8 h-8 ${
								addingToCart ? "bg-black" : "bg-white"
							} transition-all duration-300 delay-100 hover:bg-brown hover:text-white text-black flex items-center justify-center`}>
							{!addingToCart && <AiOutlineShoppingCart className="group-hover:opacity-100 group-hover:text-white text-xl" />}
							{addingToCart && <Loading1 sx="!w-5 !h-5" />}
						</button>
					</aside>
					<aside className={`absolute ${showContent ? "bottom-4" : "-bottom-[20%]"} transition-all duration-300 w-[93%] left-0 gap-4 right-0 mx-auto flex items-center h-12`}>
						<Link href={`/products/${slugname}`} className="bg-[white] flex items-center justify-center  text-black relative w-1/2 group h-full overflow-hidden">
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
				<Link href={`/products/${slugname}`} className="text-sm my-2">
					{name}
				</Link>
				<p className="text-brown font-medium">GH₵{price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
			</div>
		</article>
	);
};

export default ProductCard;
