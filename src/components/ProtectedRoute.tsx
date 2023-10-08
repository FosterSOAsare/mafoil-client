import { useEffect, ReactNode, Fragment } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useUserSlice } from "@/slices/user.slice";

import Loading from "./atom/Loading";

interface ProtectedRouteProps {
	children: ReactNode;
	loginRequired?: Boolean;
}

const ProtectedRoute = ({ children, loginRequired = false }: ProtectedRouteProps) => {
	const router = useRouter();
	const { isLoading, error, user } = useSelector(useUserSlice);

	useEffect(() => {
		if (!isLoading && !loginRequired && !error && user?._id) {
			router.replace("/");
		}
		if (!isLoading && loginRequired && (!user?._id || error)) {
			router.replace("/auth/login");
		}
	}, [router, isLoading, error, user?._id]);

	return (
		<>
			{isLoading && (
				<div className="text-white w-full h-screen flex items-center justify-center flex-col">
					<Loading />
				</div>
			)}
			{!isLoading && loginRequired && !error && user?._id && <>{children}</>}

			{!isLoading && !loginRequired && !user?._id && <>{children}</>}
		</>
	);
};

export default ProtectedRoute;
