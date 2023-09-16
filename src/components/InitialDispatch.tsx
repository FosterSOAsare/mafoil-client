import { ReactNode, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useFetchLoggedInUserRequestQuery } from "@/apis/userApi";
import { setData, setError, setIsLoading } from "@/slices/user.slice";
import { insertCartData, useCartSelector } from "@/slices/cart.slice";
import { useLazyFetchCartRequestQuery, useUploadCartRequestMutation } from "@/apis/cartApi";
import { insertWishLists, useWishListSelector } from "@/slices/wishlist.slice";
import useDebounce from "@/hooks/useDebounce";
import makeStore from "@/store";
// import { useUploadAFileRequestMutation } from "@/apis/filesApi";

import { BsArrowUp } from "react-icons/bs";
import { useRouter } from "next/router";

const store = makeStore();

const InitialDispatch = ({ children }: { children: ReactNode }) => {
	const { isLoading, error, data }: any = useFetchLoggedInUserRequestQuery();
	const [fetchCart, { error: cartError, data: cartData }]: any = useLazyFetchCartRequestQuery();
	const [uploadCart, { error: uploadError, data: uploadData }]: any = useUploadCartRequestMutation();
	const cart = useSelector(useCartSelector);
	const wishList = useSelector(useWishListSelector);
	const [showScroll, setShowScroll] = useState(false);
	const dispatch = useDispatch();
	const debounceCart = useDebounce(cart, 3000);
	const { query, replace, pathname } = useRouter();

	console.log(cart);

	useEffect(() => {
		if (isLoading) {
			setIsLoading(isLoading);
			return;
		}
		// setTimeout(() => {
		dispatch(setData(data));
		dispatch(setIsLoading(false));
		dispatch(setError(null));
		// }, 1000);
	}, [data, isLoading]);

	useEffect(() => {
		function scrollFunc() {
			setShowScroll(window.scrollY >= 300);
		}

		window.addEventListener("scroll", scrollFunc);

		return () => {
			window.removeEventListener("scroll", scrollFunc);
		};
	}, []);

	useEffect(() => {
		const err = error?.data?.error;
		dispatch(setError(err));
	}, [error]);

	// Fetch cart from db. This is only done if user is loggedin
	useEffect(() => {
		if (!data?._id) return;
		fetchCart();
	}, [data]);

	// Store cartdata in redux if user is logged in
	useEffect(() => {
		if (!cartData) return;
		dispatch(insertCartData(cartData));
	}, [cartData]);

	// Store cart  in db
	useEffect(() => {
		if (!data?._id || !debounceCart) return;
		uploadCart(cart.map((item: any) => ({ id: item._id, count: item.count })));
	}, [data, debounceCart]);

	// Store wishlist  in localStorage
	useEffect(() => {
		if (!data && !isLoading) {
			localStorage.setItem("wishlist", JSON.stringify(wishList));
		}
	}, [data, isLoading, wishList]);

	// Chech if user has a referrer query
	useEffect(() => {
		if (query?.ref) {
			localStorage.setItem("referrer", query?.ref as string);
			replace(pathname);
		}
	}, [query]);
	return (
		<main className="w-full h-auto relative">
			{children}

			<button
				className={`w-10 h-10 bg-black flex items-center justify-center fixed transition-all duration-300 ${showScroll ? "scale-100" : "scale-0"} bottom-4 right-4 z-[4] text-white`}
				onClick={() => {
					window.scrollTo(0, 0);
				}}>
				<BsArrowUp className="text-xl" />
			</button>
		</main>
	);
};
export default InitialDispatch;
