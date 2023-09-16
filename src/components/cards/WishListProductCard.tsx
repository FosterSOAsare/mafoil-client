import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { productType } from "@/types/product.type";
import { toggleItemInWishList } from "@/slices/wishlist.slice";
import { increaseItemCount } from "@/slices/cart.slice";

import Ratings from "../molecules/Ratings";
import { Loading1 } from "../atom/Loading";

import { FiExternalLink } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";

const WishListProductCard = ({ wishlistItem, setPreviewProduct, sx = "" }: { wishlistItem: productType; setPreviewProduct: React.Dispatch<React.SetStateAction<productType | null>>; sx?: string }) => {
	const { name, price, rating, totalRatings, images, slugname, _id } = wishlistItem;
	const [showContent, setShowContent] = useState(false);
	const dispatch = useDispatch();

	// For controlling the loading state
	const [addingToCart, setAddingToCart] = useState(false);

	function addToCart() {
		setAddingToCart(true);

		setTimeout(() => {
			dispatch(increaseItemCount({ wishlistItem }));
			setAddingToCart(false);
			toast.success("Item successfully added to cart", { autoClose: 1500 });
		}, 2000);
	}
	return (
		<article className="w-full h-auto bg-white ">
			<div className={`w-full h-[300px] ${sx} overflow-hidden`}>
				<div className="w-full h-full relative overflow-hidden hover:cursor-pointer" onMouseEnter={() => setShowContent(true)} onMouseLeave={() => setShowContent(false)}>
					<div className={`w-full ${showContent ? "h-[70%]" : "h-full"}  bg-[#F5F2EC]  transition-all duration-300 relative`}>
						<Image src={images[0]?.url} fill alt="product Image" />
					</div>
					<aside className="absolute top-4 right-4  w-auto h-auto">
						<button
							onClick={() => dispatch(toggleItemInWishList({ wishlistItem }))}
							className={`w-8 h-8 hover:bounce rounded-full transition-all duration-300 hover:bg-brown bg-white  text-black  hover:text-white mb-2 flex items-center justify-center`}>
							<RiDeleteBin6Line className="text-md" />
						</button>
					</aside>
					<aside className={`gap-4 mt-6 mx-auto flex items-center justify-center h-10`}>
						<button
							className={`border-border border-[1px] hover:border-brown ${
								addingToCart ? "bg-brown" : "bg-white"
							} flex items-center justify-center hover:bg-brown  text-black relative w-10 h-10 group`}
							onClick={addToCart}
							disabled={addingToCart}>
							{!addingToCart && <BsCartPlus className="opacity-50 group-hover:opacity-100 group-hover:text-white text-xl" />}
							{addingToCart && <Loading1 />}
						</button>
						<Link
							href={`/products/${slugname}`}
							className="border-border border-[1px] hover:border-brown flex items-center justify-center hover:bg-brown  text-black relative w-10 h-10 group">
							<FiExternalLink className="opacity-50 group-hover:opacity-100 group-hover:text-white text-xl" />
						</Link>
						<button
							className="border-border border-[1px] hover:border-brown flex items-center justify-center hover:bg-brown  text-black relative w-10 h-10 group"
							onClick={() => setPreviewProduct(wishlistItem)}>
							<AiOutlineEye className="opacity-50 group-hover:opacity-100 group-hover:text-white text-xl" />
						</button>
					</aside>
				</div>
			</div>
			<div className="h-[150px] flex items-start justify-center flex-col">
				<Ratings rating={rating} totalRatings={totalRatings} />
				<Link href={`/products/${slugname}`} className="text-sm my-2">
					{name}
				</Link>
				<p className="text-brown font-medium">GH₵{price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
			</div>
		</article>
	);
};

export default WishListProductCard;
