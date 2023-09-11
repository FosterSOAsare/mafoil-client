import { useUserSlice } from "@/slices/user.slice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { useLazyLogoutRequestQuery } from "@/apis/authApi";
import { logout } from "@/slices/user.slice";

import ProtectedRoute from "@/components/ProtectedRoute";

const index = () => {
	const user = useSelector(useUserSlice);
	const dispatch = useDispatch();

	const [logoutRequest] = useLazyLogoutRequestQuery();

	function logoutUser() {
		try {
			logoutRequest();
			dispatch(logout());
		} catch (e) {
			console.log(e);
		}
	}
	return (
		<ProtectedRoute registerRequired={true}>
			<div className="w-full h-screen bg-[red] flex items-center justify-center">
				<button className="p-4 rounded-4 bg-[green]" onClick={() => logoutUser()}>
					Logout
				</button>
			</div>
		</ProtectedRoute>
	);
};

export default index;
