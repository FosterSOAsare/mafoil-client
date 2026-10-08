import React, { useMemo } from "react";
import Image from "next/image";

import { productType } from "@/types/product.type";
import { useDispatch, useSelector } from "react-redux";
import { cartItemType, useCartSelector, removeItem } from "@/slices/cart.slice";

import CartItemNumberModerator from "../molecules/CartItemNumberModerator";

const PreviewCartItemCard = ({ product, index }: { product: productType; index: number }) => {
	const cart = useSelector(useCartSelector);
	const dispatch = useDispatch();
	const itemCount = useMemo(() => {
		return cart?.find((p: cartItemType) => product._id == p._id)?.count || 0;
	}, [cart]);

	return (
		<div className={`w-full p-3 h-auto ${index !== cart?.length - 1 && "border-b"} flex gap-2 mb-4 items-center`}>
			<div className="w-28 h-20 relative">
				<Image src={product?.images[0]?.url} alt="product Image" fill />
			</div>
			<div className="w-full">
				<h3 className="text-sm text-bold text-black mb-2">{product?.name}</h3>
				<div className="w-full flex gap-2 items-center">
					<div className="w-[80px] h-6 border text-[13px] px-2 flex items-center justify-between">
						<CartItemNumberModerator itemCount={itemCount} product={product} />
					</div>
					<p className="text-[12px]">GH₵{(product?.price * itemCount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
				</div>

				<button className="text-[12px] underline hover:no-underline hover:text-[red] uppercase mt-2" onClick={() => dispatch(removeItem({ _id: product?._id }))}>
					Remove
				</button>
			</div>
		</div>
	);
};

export default PreviewCartItemCard;
