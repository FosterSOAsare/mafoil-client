import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { productType } from "@/types/product.type";
import useCheckClickOutsideParent from "@/hooks/useCheckClickOutsideParent";

import Ratings from "@/components/molecules/Ratings";
import { HiOutlineDotsVertical } from "react-icons/hi";

const AdminProductCard = ({ images, name, rating, price, slugname }: productType) => {
	const [show, setShow] = useState(false);
	const parentRef = useRef<any>(null);
	useCheckClickOutsideParent({ parentRef, setShow });

	return (
		<div className="w-full h-auto py-4 flex items-center justify-between border-b-[1px]">
			<div className="w-1/3 h-full flex items-center gap-4">
				<div className="w-28 h-20 relative">
					<Image src={images[0]?.url} alt="product Image" fill />
				</div>
				<Link href={`/products/${slugname}`} className="hover:text-brown w-full text-sm text-bold text-black mb-2">
					{name}
				</Link>
			</div>
			<p className="w-1/5 flex flex-col items-center justify-center">GH₵{price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>

			<p className="w-1/5 text-right flex justify-center text-sm font-medium">
				<Ratings rating={rating.avgRating} totalRatings={rating.totalRatings} />
			</p>
			<div className="w-8 relative" ref={parentRef}>
				<button className="w-8 rounded-full flex items-center justify-center hover:bg-slate-200 h-8" onClick={() => setShow((prev) => !prev)}>
					<HiOutlineDotsVertical />
				</button>

				{show && (
					<div className="options w-24 flex flex-col absolute z-[3] top-[100%] rounded-[5px] right-[20%] h-auto overflow-hidden border-[1px]">
						<Link href={`/products/${slugname}/edit`} className="p-2 px-3 hover:bg-blue hover:text-white border-b-[1px] bg-slate-100 shadow-md text-sm">
							{" "}
							Edit{" "}
						</Link>
						<button className="flex justify-start text-sm p-2 px-3 hover:bg-red-600 hover:text-white bg-slate-100 shadow-md">Delete</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default AdminProductCard;
