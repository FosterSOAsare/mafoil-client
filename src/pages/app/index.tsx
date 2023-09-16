import React from "react";

import useLogoutUser from "@/hooks/useLogoutUser";

import ProtectedRoute from "@/components/ProtectedRoute";

const index = () => {
	const logoutUser = useLogoutUser();

	return (
		<ProtectedRoute loginRequired={true}>
			<div className="w-full h-screen bg-[red] flex items-center justify-center">
				<button className="p-4 rounded-4 bg-[green]" onClick={() => logoutUser()}>
					Logout
				</button>
			</div>
		</ProtectedRoute>
	);
};

export default index;
