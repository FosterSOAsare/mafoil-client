import { productType } from "@/types/product.type";
import React, { useMemo } from "react";
import Image from "next/image";

import { reduceItemCount, increaseItemCount } from "@/slices/cart.slice";

import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { cartItemType, useCartSelector } from "@/slices/cart.slice";

const PreviewCartItemCard = ({ product, index }: { product: productType; index: number }) => {
	const cart = useSelector(useCartSelector);
	const dispatch = useDispatch();
	const itemCount = useMemo(() => {
		return cart?.find((p: cartItemType) => product.id == p.id)?.count || 0;
	}, [cart]);

	return (
		<div className={`w-full p-3 h-auto ${index !== cart?.length - 1 && "border-b-[1px]"} flex gap-2 mb-4 items-center`}>
			<div className="w-24 h-16 relative">
				<Image src={product?.images[0]} alt="product Image" fill />
			</div>
			<div className="w-full">
				<h3 className="text-sm text-bold text-black mb-2">{product?.name}</h3>
				<div className="w-full flex gap-2 items-center">
					<div className="w-[80px] h-6 border-[1px] text-[13px] px-2 flex items-center justify-between">
						<button onClick={() => dispatch(reduceItemCount({ id: product?.id }))} className={`p-[2px] ${itemCount !== 0 && "hover:bg-black hover:text-white"}`} disabled={itemCount === 0}>
							<AiOutlineMinus />
						</button>
						<p>{itemCount}</p>
						<button
							onClick={() => dispatch(increaseItemCount({ id: product?.id }))}
							className={`p-[2px] ${itemCount < 99 && "hover:bg-black hover:text-white"}`}
							disabled={itemCount >= 99}>
							<AiOutlinePlus />
						</button>
					</div>
					<p className="text-[12px]">GH₵{(product?.price * itemCount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
				</div>
			</div>
		</div>
	);
};

export default PreviewCartItemCard;
