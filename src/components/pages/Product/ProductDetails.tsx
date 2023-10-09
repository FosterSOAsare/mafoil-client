import React, { useRef, useCallback, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import { productType } from "@/types/product.type";
import { goPrev, goNext } from "@/utils/swiper";
import filters from "@/data/productfilters";
import { increaseItemCount } from "@/slices/cart.slice";
import useCheckIfProductIsInWishList from "@/hooks/useCheckIfProductIsInWishList";
import { toggleItemInWishList } from "@/slices/wishlist.slice";
import { useUserSlice } from "@/slices/user.slice";
import produceError from "@/utils/produceErrorIfUserIsNotLoggedIn";
import { createDateFromString } from "@/utils/createDate";

import Ratings from "@/components/molecules/Ratings";
import ItemInCartCount from "@/components/molecules/ItemInCartCount";
import { Loading1 } from "@/components/atom/Loading";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";
import ReviewForm from "./ReviewForm";

const ProductDetails = ({ product, reviews }: { product: productType; reviews: any[] }) => {
	const swiperRef = useRef<any>(null);
	const [count, setCount] = useState(0);
	const [active, setActive] = useState(0);
	const [cartLoading, setCartLoading] = useState(false);
	const [tab, setTab] = useState("description");
	const { user } = useSelector(useUserSlice);
	const [showReviewForm, setShowReviewForm] = useState(false);

	// Fetch user reviews

	const partOfWishList = useCheckIfProductIsInWishList(product?._id as string);

	const dispatch = useDispatch();

	const handleSwiper = useCallback((swiper: any) => {
		swiper.on("slideChange", () => {
			const activeIndex = swiper.activeIndex;
			setActive(activeIndex);
		});
	}, []);

	const addToCart = () => {
		setCartLoading(true);
		setCount(0);
		setTimeout(() => {
			dispatch(increaseItemCount({ count, product: product }));
			setCartLoading(false);
		}, 2000);
	};

	return (
		<section className="w-full h-auto">
			<div className="w-full h-auto mt-4 flex items-start justify-between">
				<article className="w-3/5 h-auto">
					<div className="w-full relative h-screen group hover:cursor-pointer">
						<button
							className={`w-7 h-10 absolute bg-white hover:bg-brown hover:text-white scale-0 ${
								active == 0 ? "" : "group-hover:scale-100"
							} transition-all duration-300 text-black top-0 left-0 flex items-center justify-center bottom-0 my-auto z-[2]`}
							onClick={() => goPrev(swiperRef)}
							disabled={active === 0}>
							<FiChevronLeft />
						</button>
						<Swiper spaceBetween={30} slidesPerView={1} autoplay={true} ref={swiperRef} className="overflow-y-visible w-full h-full relative" onSwiper={handleSwiper}>
							{[1, 2, 3, 4].map((_i, index: number) => (
								<SwiperSlide key={index} className=" w-full bg-[#f5f2ec] flex items-center justify-center h-full">
									<div className="w-[500px] h-[500px] relative ">
										<Image fill src={product?.images[0]?.url} alt="Product Image" sizes="(max-width: 767px) 100vw, 50vw" />
									</div>
								</SwiperSlide>
							))}
						</Swiper>
						<button
							className={`${
								active == 3 ? "" : "group-hover:scale-100"
							} w-7 h-10 absolute bg-white hover:bg-brown hover:text-white scale-0 transition-all duration-300 text-black top-0 right-0 flex items-center justify-center bottom-0 my-auto z-[2]`}
							onClick={() => goNext(swiperRef)}
							disabled={active === 3}>
							<FiChevronRight />
						</button>
					</div>

					<div className="w-4/5 mx-auto h-[30vh] flex items-center gap-4 justify-between bg-white">
						{[1, 2, 3, 4].map((_i, index) => (
							<div key={index} className={`w-full bg-[red]  h-[20vh] relative ${active === index ? "opacity-100" : "opacity-40"} transition-all duration-200`}>
								<Image fill src={product?.images[0]?.url} alt="Product Image" />
							</div>
						))}
					</div>
				</article>
				<article className="w-2/5 h-[130vh] pl-6 flex items-center justify-start flex-col">
					<div className="pb-8 border-b-[1px] flex items-center gap-2 relative justify-start flex-col w-full">
						<Link href={`/products?type=${product?.category}`} className="uppercase hover:text-brown opacity-60">
							{filters?.find((filt) => filt.option === product?.category)?.name}
						</Link>

						<h1 className="text-2xl font-medium">{product?.name}</h1>
						<Ratings rating={product?.rating?.avgRating as number} totalRatings={product?.rating?.totalRatings as number} />

						<h3 className="text-xl text-brown font-medium">GH₵{product?.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
						<p className="text-center opacity-80">{product?.short_desc}</p>

						<button
							className={`absolute -top-4 right-5 h-10 w-10 ${
								partOfWishList ? "text-white bg-brown hover:text-black border-brown" : "hover:text-white hover:bg-brown hover:border-brown text-brown"
							}  flex items-center justify-center border-[1px] rounded-full`}
							onClick={() => produceError(user?._id, () => dispatch(toggleItemInWishList({ wishlistItem: product })))}>
							<AiOutlineHeart className="text-xl" />
						</button>
					</div>

					<div className="w-full gap-2 py-6 border-b-[1px] flex items-center flex-col">
						<div className="flex items-center gap-2 text-[#7BB997]">
							<span className="w-4 flex rounded-full items-center justify-center h-4 text-[#7BB997] border-[#7BB997] border-[1px]">
								<BsCheck />
							</span>
							<p>In stock</p>
						</div>

						<p>{40} pieces sold so far </p>
					</div>

					<ItemInCartCount product={product} itemCount={count} increaseCount={() => setCount((prev) => ++prev)} decreaseCount={() => setCount((prev) => --prev)} />

					<button
						className={`bg-black ${
							count === 0 ? "opacity-70" : "opacity-100 hover:bg-brown"
						}  text-white gap-3 w-full h-14 flex items-center justify-center  group transition-all duration-200`}
						onClick={() => produceError(user?._id, addToCart)}
						disabled={count === 0}>
						{cartLoading && <Loading1 />}
						<p className={`uppercase inline ${count > 0 && "group-hover:text-[14px]"} text-[13px] tracking-[2px]  animate-fadeIn infinite   transition-all duration-150`}>Add to cart</p>
					</button>
				</article>
			</div>

			<div className="w-full h-auto  mt-8 flex flex-col justify-center items-center">
				<div className="w-full h-auto border-b-[1px]">
					<div className="h-12 w-1/3 mx-auto px-4 flex justify-between items-center">
						{["Description", "Review", "Refund"].map((t, index) => (
							<button key={index} className={`h-full px-2 ${tab === t.toLocaleLowerCase() ? "active-tab text-black  font-medium relative" : ""}`} onClick={() => setTab(t.toLowerCase())}>
								{t}
							</button>
						))}
					</div>
				</div>
				<div className="w-full h-auto">
					<div className={`w-full  py-16  ${tab !== "review" ? "border-b-[1px]" : ""} `}>
						{tab === "description" && <p className="w-4/5 text-left text-sm leading-[35px] opacity-80 mx-auto">{product?.long_desc ? product?.long_desc : product?.short_desc}</p>}
						{tab === "refund" && (
							<div className="w-4/5 mx-auto">
								<p className="text-left text-sm leading-[35px] opacity-80 mx-auto">You can choose to ask for a refund on a full priced items after purchase.</p>

								<ul className="list-disc px-10 text-sm opacity-80">
									<li className="mb-2">Customer has ability to ask for a refund within 2 hours of purchase</li>
									<li className="mb-2">Occassionally free items are not eligible for a refund</li>
								</ul>
							</div>
						)}
						{tab === "review" && (
							<div className="w-4/5 mx-auto">
								<h3 className="text-3xl font-medium mb-4">Customer Reviews</h3>
								<div className="flex justify-between items-center">
									{reviews?.length === 0 && <p className="text-sm opacity-80">No reviews yet</p>}
									{reviews?.length > 0 && (
										<p className="text-sm opacity-80 flex items-center gap-2">
											<Ratings rating={product?.rating.avgRating} sx="!text-lg " /> Based on {product.rating.totalRatings} review
										</p>
									)}

									<button
										onClick={() => setShowReviewForm((prev: boolean) => !prev)}
										className={`mt-4 !w-[180px] flex items-center justify-center bg-transparent hover:border-brown text-black border-[1px] border-black relative group h-12 overflow-hidden`}>
										<span className={`w-full h-full bg-brown -left-[100%] absolute transition-all duration-300 top-0 group-hover:-left-0 z-[1] `}></span>
										<p className="relative z-[2] transition-all duration-75 group-hover:text-white uppercase text-[12px] font-medium">
											{showReviewForm ? "Cancel" : "Write A Review"}
										</p>
									</button>
								</div>

								{showReviewForm && <ReviewForm slugname={product?.slugname} setShowReviewForm={setShowReviewForm} />}
								{reviews?.length > 0 && (
									<div className="w-full mt-6 h-auto">
										{reviews?.map((review, index) => (
											<div className="w-full border-[1px] mb-6 min-h-36 p-6">
												<div className="w-full flex gap-2">
													<Ratings rating={review?.rating} />
													<p className="text-slate-400 text-sm">
														{review?.name} on {createDateFromString(review?.createdAt)}
													</p>
												</div>

												<h3 className="font-medium text-lg mt-2">{review?.title}</h3>
												<p className="text-sm mt-2">{review?.comment}</p>
											</div>
										))}
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProductDetails;
