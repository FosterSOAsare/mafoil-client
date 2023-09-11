import { ReactNode, useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import { useDispatch } from "react-redux";

import { useFetchLoggedInUserRequestQuery } from "@/apis/userApi";
import { setData, setError, setIsLoading } from "@/slices/user.slice";

import makeStore from "@/store";

import { BsArrowUp } from "react-icons/bs";

const store = makeStore();

const InitialDispatch = ({ children }: { children: ReactNode }) => {
	const { isLoading, error, data }: any = useFetchLoggedInUserRequestQuery();
	const [showScroll, setShowScroll] = useState(false);
	const dispatch = useDispatch();
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
export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<InitialDispatch>
				<Component {...pageProps} />
			</InitialDispatch>
		</Provider>
	);
}
