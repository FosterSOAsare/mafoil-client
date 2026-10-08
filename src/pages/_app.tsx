"use client";

import "swiper/css";
import "swiper/css/pagination";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Jost, Playfair_Display } from "next/font/google";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import InitialDispatch from "@/components/InitialDispatch";

import makeStore from "@/store";

const store = makeStore();

// Self-hosted by next/font. Exposed as CSS variables used by the font-jost / font-playfair theme tokens in globals.css
const jost = Jost({ subsets: ["latin"], weight: ["400", "500", "700"], display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"], style: ["normal", "italic"], display: "swap" });

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<style jsx global>{`
				:root {
					--font-jost-family: ${jost.style.fontFamily};
					--font-playfair-family: ${playfair.style.fontFamily};
				}
			`}</style>
			<InitialDispatch>
				<Component {...pageProps} />
			</InitialDispatch>
			{/* The only toast container in the app (react-toastify v11 injects its own CSS) */}
			<ToastContainer position="top-right" newestOnTop />
		</Provider>
	);
}
