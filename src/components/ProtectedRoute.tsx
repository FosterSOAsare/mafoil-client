import { useEffect, ReactNode, Fragment } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useUserSlice } from "@/slices/user.slice";

import Loading from "@/components/Loading";

interface ProtectedRouteProps {
	children: ReactNode;
	registerRequired?: Boolean;
}

const ProtectedRoute = ({ children, registerRequired = false }: ProtectedRouteProps) => {
	const router = useRouter();
	const { isLoading, error, user } = useSelector(useUserSlice);

	useEffect(() => {
		if (!isLoading && !registerRequired && !error && user?.id) {
			router.replace("/app");
		}
		if (!isLoading && registerRequired && (!user?.id || error)) {
			router.replace("/auth/login");
		}
	}, [router, isLoading, error, user?.id]);

	return (
		<>
			{isLoading && <Loading />}
			{!isLoading && registerRequired && !error && user?.id && <>{children}</>}

			{!isLoading && !registerRequired && !user?.id && <>{children}</>}
		</>
	);
};

export default ProtectedRoute;
