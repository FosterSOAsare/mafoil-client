import { ReactNode, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useFetchLoggedInUserRequestQuery } from "@/apis/userApi";
import { setData, setError, setIsLoading } from "@/slices/user.slice";
import { cartItemType, insertCartData, useCartSelector } from "@/slices/cart.slice";
import makeStore from "@/store";
import useDebounce from "@/hooks/useDebounce";

import { BsArrowUp } from "react-icons/bs";

const store = makeStore();

const InitialDispatch = ({ children }: { children: ReactNode }) => {
	const { isLoading, error, data }: any = useFetchLoggedInUserRequestQuery();
	const cart = useSelector(useCartSelector);
	const [showScroll, setShowScroll] = useState(false);
	const dispatch = useDispatch();
	const debounceCart = useDebounce(cart, 3000);
	useEffect(() => {
		if (isLoading) {
			setIsLoading(isLoading);
			return;
		}
		dispatch(setData(data));
		dispatch(setIsLoading(false));
		dispatch(setError(null));
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

	useEffect(() => {
		// Fetch cart from localStorage
		if (!isLoading) return;
		if (!data) {
			let cart: string = localStorage.getItem("cart") || "[]";
			cart = JSON.parse(cart);
			dispatch(insertCartData(cart));
		}
	}, [data, isLoading]);

	// Store cart in localStorage
	useEffect(() => {
		if (!data && !isLoading) {
			console.log(debounceCart);
			localStorage.setItem("cart", JSON.stringify(cart));
		}
	}, [data, debounceCart]);
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
