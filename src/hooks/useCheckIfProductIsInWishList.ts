import { useMemo } from "react";
import { useSelector } from "react-redux";

import { useWishListSelector } from "@/slices/wishlist.slice";
import { productType } from "@/types/product.type";

const useCheckIfProductIsInWishList = (_id: string) => {
	const wishlist = useSelector(useWishListSelector);
	const exists = useMemo(() => {
		return wishlist.find((item: productType) => item?._id === _id);
	}, [_id, wishlist]);

	return Boolean(exists);
};

export default useCheckIfProductIsInWishList;
