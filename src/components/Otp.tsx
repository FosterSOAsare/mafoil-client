import React, { useEffect, useState } from "react";
type OtpState = {
	code: string;
	handleChange: (e: any) => void;
};

const Otp = ({ handleChange, code }: OtpState) => {
	const [innerCode, setInnerCode] = useState(code);
	useEffect(() => {
		setInnerCode(`${code}`);
	}, [code]);
	return (
		<div className="w-full lg:w-4/5 mb-6 h-14">
			<label htmlFor="otp" className="w-full  h-full  flex items-center justify-center gap-2 ">
				{[1, 2, 3, 4, 5, 6].map((field, index) => (
					<div
						key={index}
						className={`w-12 relative flex items-center justify-center h-12 rounded-[5px] border-2 ${
							index < innerCode.length ? "border-sec" : "border-desc"
						} flex items-end justify-center text-sec text-3xl font-bold`}>
						{innerCode.substring(index, index + 1)}
						{index >= innerCode.length && <div className="w-3/5 h-[2px] mb-[4px] bottom-[2px] absolute bg-black"></div>}
					</div>
				))}
			</label>
			<input type="text" className="w-0 h-0" id="otp" value={code} onChange={(e: any) => handleChange(e)} autoFocus={true} />
		</div>
	);
};

export default Otp;
