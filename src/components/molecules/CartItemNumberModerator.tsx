import React from "react";
import { useDispatch } from "react-redux";

import { reduceItemCount, increaseItemCount } from "@/slices/cart.slice";

import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { productType } from "@/types/product.type";

const CartItemNumberModerator = ({ itemCount, product }: { itemCount: number; product: productType }) => {
	const dispatch = useDispatch();
	return (
		<div className="w-full h-full  text-[13px] flex items-center justify-between">
			<button onClick={() => dispatch(reduceItemCount({ _id: product?._id }))} className={`p-[2px] ${itemCount !== 0 && "hover:bg-black hover:text-white"}`} disabled={itemCount === 0}>
				<AiOutlineMinus />
			</button>
			<p>{itemCount}</p>
			<button onClick={() => dispatch(increaseItemCount({ product }))} className={`p-[2px] ${itemCount < 99 && "hover:bg-black hover:text-white"}`} disabled={itemCount >= 99}>
				<AiOutlinePlus />
			</button>
		</div>
	);
};

export default CartItemNumberModerator;
