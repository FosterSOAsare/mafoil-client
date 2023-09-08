import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { useEffect } from "react";

import makeStore from "@/store";

const store = makeStore();

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}
