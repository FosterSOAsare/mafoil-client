import "swiper/css";
import "swiper/css/pagination";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import InitialDispatch from "@/components/InitialDispatch";

import makeStore from "@/store";

const store = makeStore();

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<InitialDispatch>
				<Component {...pageProps} />
			</InitialDispatch>
		</Provider>
	);
}
