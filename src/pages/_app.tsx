import { ReactNode, useEffect } from "react";
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

const store = makeStore();

const InitialDispatch = ({ children }: { children: ReactNode }) => {
	const { isLoading, error, data }: any = useFetchLoggedInUserRequestQuery();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setData(data));
		dispatch(setIsLoading(false));
		dispatch(setError(null));
	}, [data]);

	useEffect(() => {
		const err = error?.data?.error;
		dispatch(setError(err));
	}, [error]);
	return <>{children}</>;
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
