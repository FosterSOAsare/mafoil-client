import { useUserSlice } from "@/slices/user.slice";
import React from "react";
import { useSelector } from "react-redux";

const index = () => {
	const user = useSelector(useUserSlice);
	console.log(user);
	return <div>index</div>;
};

export default index;
