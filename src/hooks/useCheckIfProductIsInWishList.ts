import { useMemo } from "react";
import { useSelector } from "react-redux";

import { useWishListSelector, wishLIstItemType } from "@/slices/wishlist.slice";

const useCheckIfProductIsInWishList = (id: string) => {
	const wishlist = useSelector(useWishListSelector);
	const exists = useMemo(() => {
		return wishlist.find((item: wishLIstItemType) => item?.id === id);
	}, [id, wishlist]);

	return Boolean(exists);
};

export default useCheckIfProductIsInWishList;
