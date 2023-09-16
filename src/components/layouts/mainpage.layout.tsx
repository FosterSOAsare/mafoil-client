import React, { ReactNode } from "react";
import Link from "next/link";

import Header from "../molecules/Header";
import Footer from "../molecules/Footer";
import ProtectedRoute from "../ProtectedRoute";

const MainPageLayout = ({ children, loginRequired = true }: { children: ReactNode; loginRequired?: boolean }) => {
	return (
		<ProtectedRoute loginRequired={loginRequired}>
			<Header />
			<div className="w-full min-h-screen py-12 flex flex-col items-center max-w-7xl mx-auto">{children}</div>
			<Footer />
		</ProtectedRoute>
	);
};

export default MainPageLayout;
