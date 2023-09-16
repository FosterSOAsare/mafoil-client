import React from "react";

export const Loading1 = () => {
	return <div className="custom-loader1"></div>;
};
const Loading = ({ sx = "" }: { sx?: string }) => {
	return <div className={`custom-loader ${sx}`}></div>;
};

export default Loading;
