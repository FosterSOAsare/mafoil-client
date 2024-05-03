import React from "react";
import Head from "next/head";

import Header from "@/components/molecules/Header";
import Footer from "@/components/molecules/Footer";
import NotFound from "@/components/NotFound";

const NotFoundPage = () => {
	return (
		<>
			<Head>
				<title>404 - Page Not Found</title>
			</Head>
			<Header />
			<NotFound />
			<Footer />
		</>
	);
};

export default NotFoundPage;
