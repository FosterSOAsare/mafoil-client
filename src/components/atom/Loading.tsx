import React from "react";

export const Loading1 = ({ sx = "" }: { sx?: string }) => {
	return <div className={`custom-loader1 ${sx}`}></div>;
};
const Loading = ({ sx = "", text = "" }: { sx?: string; text?: string }) => {
	return (
		<div className="flex items-center justify-center flex-col">
			<div className={`custom-loader ${sx}`}></div>
			<p>{text}</p>
		</div>
	);
};

export default Loading;
