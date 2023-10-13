import { productType } from "@/types/product.type";
import React from "react";
import Image from "next/image";

import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const ItemInCartCount = ({ product, increaseCount, decreaseCount, itemCount }: { product: productType; increaseCount: any; decreaseCount: any; itemCount: number }) => {
	return (
		<div className="flex w-full max-w-[500px] py-6 items-center gap-2">
			<div className="w-full p-3 h-auto border-black border-[1px] flex gap-2 items-center">
				<div className="w-16 h-16 relative">
					<Image src={product?.images[0]?.url} alt="product Image" fill />
				</div>
				<div>
					<h3>{product?.name}</h3>
					<p>GH₵{product?.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
				</div>

				<div className="w-1/4 h-8 border-[1px] border-black px-2 flex items-center justify-between  ml-auto">
					<button onClick={() => decreaseCount()} disabled={itemCount === 0}>
						<AiOutlineMinus />
					</button>
					<p>{itemCount}</p>
					<button onClick={() => increaseCount()}>
						<AiOutlinePlus />
					</button>
				</div>
			</div>
		</div>
	);
};

export default ItemInCartCount;
