import { cartItemType, useCartSelector } from "@/slices/cart.slice";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

import useGetCartSubTotal from "@/hooks/useGetCartSubTotal";
import useCheckoutCart from "@/hooks/useCheckoutCart";

import PreviewCartItemCard from "../cards/PreviewCartItemCard";

import { AiOutlineClose } from "react-icons/ai";
import { productType } from "@/types/product.type";
import { ToastContainer } from "react-toastify";

const CartPreview = ({ setShowCart }: { setShowCart: React.Dispatch<React.SetStateAction<boolean>> }) => {
	const cart = useSelector(useCartSelector);
	const subtotal = useGetCartSubTotal({ cart });
	const { checkOut, isLoading } = useCheckoutCart();

	const [agreeToTerms, setAgreeToTerms] = useState(false);

	const cartItems = useMemo(() => {
		return cart.map((item: cartItemType) => {
			// remove the item count from the cart items
			let { count, ...rest } = item;
			return rest;
		});
	}, [cart]);
	return (
		<aside className="w-1/4 bg-white shadow-md  fixed right-0 flex items-center justify-start pb-6 flex-col top-[12.7vh] z-[2] h-[88vh] overflow-y-auto ">
			<div className="w-full bg-white sticky top-0 left-0 z-[2] shadow-sm">
				<button className="w-8 mx-4 my-4 h-8 hover:bg-slate-200 ml-auto flex items-center justify-center" onClick={() => setShowCart(false)}>
					<AiOutlineClose />
				</button>
			</div>
			{cart?.length == 0 && <p className="text-xm my-auto mx-auto">Your cart is currently empty.</p>}

			{cart?.length > 0 && (
				<>
					<div className="w-full h-[50vh] overflow-auto px-2 border-b-[1px] border-black pb-2">
						{cartItems.map((item: productType, index: number) => (
							<PreviewCartItemCard key={index} product={item} index={index} />
						))}
					</div>

					<div className="px-6 w-full h-[38vh]">
						<div className="w-full pb-2 border-b-[1px] border-dashed">
							<div className="w-full text-medium mt-4 flex items-center justify-between">
								<p>SUBTOTAL:</p>
								<p className="font-bold">GH₵{subtotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
							</div>
							<p className="opacity-80 text-sm mt-2">Taxes and shipping calculated at checkout</p>
						</div>

						<div className="w-full mt-4">
							<div className="flex gap-2 items-center">
								<input type="radio" id="terms" className="accent-brown rounded-full" checked={agreeToTerms} onClick={(e) => setAgreeToTerms((prev) => !prev)} onChange={() => {}} />
								<label htmlFor="terms" className="text-sm hover:cursor-pointer">
									I agree with
									<Link href="/" className="hover:text-brown ml-[4px] hover:active-tab relative">
										the terms and conditions
									</Link>
								</label>
							</div>

							<button
								onClick={() => checkOut()}
								className={`mt-4 flex items-center justify-center bg-black ${!agreeToTerms && "opacity-70"} text-white relative w-full group h-12 overflow-hidden`}>
								<span className={`w-full h-full bg-brown absolute transition-all duration-300 top-0 ${agreeToTerms && "group-hover:left-0"} z-[1] -left-[100%]`}></span>
								<p className="relative z-[2] transition-all duration-75 group-hover:text-white uppercase text-[12px] font-medium">Checkout</p>
							</button>

							<Link href="/cart" className={`mt-4 flex items-center justify-center border-black text-black hover:border-brown border-[1px] relative w-full group h-12 overflow-hidden`}>
								<span className={`w-full h-full bg-brown absolute transition-all duration-300 top-0 group-hover:left-0 z-[1] -left-[100%]`}></span>
								<p className="relative z-[2] transition-all duration-75 group-hover:text-white uppercase text-[12px] font-medium">View Cart</p>
							</Link>
						</div>
					</div>
				</>
			)}
			<ToastContainer />
		</aside>
	);
};

export default CartPreview;
