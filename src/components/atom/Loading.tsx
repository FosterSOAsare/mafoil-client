import React from "react";

export const Loading1 = ({ sx = "" }: { sx?: string }) => {
	return <div className={`custom-loader1 ${sx}`}></div>;
};
const Loading = ({ sx = "" }: { sx?: string }) => {
	return <div className={`custom-loader ${sx}`}></div>;
};

export default Loading;
