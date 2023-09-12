import { ReactNode, useEffect } from "react";
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
	const { isLoading, error, data } = useFetchLoggedInUserRequestQuery();
	const dispatch = useDispatch();
	useEffect(() => {
		if (!data && !error && !isLoading) return;
		if (data) dispatch(setData(data));
		if (error) dispatch(setError(error));
		dispatch(setIsLoading(isLoading));
	}, [data, error, isLoading]);
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
