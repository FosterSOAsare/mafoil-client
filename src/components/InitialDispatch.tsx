import { ReactNode, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { useFetchLoggedInUserRequestQuery } from "@/apis/userApi";
import { setData, setError, setIsLoading } from "@/slices/user.slice";
import { cartItemType, insertCartData, useCartSelector } from "@/slices/cart.slice";
import { useLazyFetchCartRequestQuery, useUploadCartRequestMutation } from "@/apis/cartApi";
import { insertWishLists, useWishListSelector } from "@/slices/wishlist.slice";
import { useLazyFetchUserNotificationsRequestQuery } from "@/apis/notificationsApi";
import { setNotificationsData } from "@/slices/notifications.slice";
import useDebounce from "@/hooks/useDebounce";
import makeStore from "@/store";
import { useLazyFetchWishListRequestQuery, useUploadWishListRequestMutation } from "@/apis/wishListApi";
import { productType } from "@/types/product.type";

import { BsArrowUp } from "react-icons/bs";

const store = makeStore();

const InitialDispatch = ({ children }: { children: ReactNode }) => {
	const { isLoading, error, data }: any = useFetchLoggedInUserRequestQuery();
	const [fetchCart, { error: cartError, data: cartData, isLoading: cartLoading }]: any = useLazyFetchCartRequestQuery();
	const [fetchWishList, { data: wishListData, isLoading: wishListLoading }] = useLazyFetchWishListRequestQuery();
	const [fetchNotifications, { data: notificationData }] = useLazyFetchUserNotificationsRequestQuery();
	const [uploadCart, {}]: any = useUploadCartRequestMutation();
	const [uploadWishList, {}]: any = useUploadWishListRequestMutation();
	const cart = useSelector(useCartSelector);
	const wishList = useSelector(useWishListSelector);
	const [showScroll, setShowScroll] = useState(false);
	const dispatch = useDispatch();
	const debounceCart = useDebounce(cart, 3000);
	const debounceWishList = useDebounce(wishList, 3000);
	const { query, replace, pathname } = useRouter();

	useEffect(() => {
		if (isLoading) {
			setIsLoading(isLoading);
			return;
		}
		// setTimeout(() => {
		dispatch(setData({ ...data, accountVerified: data?.activated }));
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

	// Fetch cart  and wishlist from db. This is only done if user is loggedin
	useEffect(() => {
		if (!data?._id) return;
		fetchCart();
		fetchWishList();
		fetchNotifications();
	}, [data]);

	// Store cartdata in redux if user is logged in
	useEffect(() => {
		if (!cartData && !wishListData && !notificationData) return;
		dispatch(insertCartData(cartData ? cartData : []));
		dispatch(insertWishLists(wishListData ? wishListData : []));
		dispatch(setNotificationsData(notificationData ? notificationData : []));
	}, [cartData, wishListData, notificationData]);

	// Store cart  in db
	useEffect(() => {
		if (!data?._id || !debounceCart || !cartData) return;
		uploadCart(debounceCart.map((item: cartItemType) => ({ id: item._id, count: item.count })));
	}, [data, debounceCart]);

	// Store wishlist  in db
	useEffect(() => {
		if (!data?._id || !debounceWishList || !wishListData) return;
		uploadWishList(debounceWishList.map((item: productType) => item._id));
	}, [data, debounceWishList]);

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
