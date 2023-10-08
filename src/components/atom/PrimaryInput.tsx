import React, { useState } from "react";
import { UseFormRegister, FieldValues } from "react-hook-form/dist/types";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type primaryInputType = {
	label?: string;
	name: string;
	placeholder?: string;
	type?: string;
	register: UseFormRegister<FieldValues>;
	sx?: string;
	labelsx?: string;
};

const PrimaryInput = ({ name, label, placeholder, type = "text", register, sx = "", labelsx = "" }: primaryInputType) => {
	const [innerType, setInnerType] = useState<string>(type);
	return (
		<div className="w-full h-auto overflow-hidden">
			{label && (
				<label htmlFor={name} className={`block w-full font-semibold mb-[2px] ${labelsx}`}>
					{label}
				</label>
			)}
			<div className={`w-full h-auto overflow-hidden flex items-center py-[2px] mb-4 px-2 pl-3 justify-between border-[1px] ${sx} border-[#000000c2]`}>
				<input type={innerType} id={name} className="w-full  h-10 focus:outline-none  text-black " placeholder={placeholder || ""} {...register(name)} />
				{type === "password" && (
					<button
						type="button"
						className="w-8 h-4 border-l-[1px] border-black flex text-md opacity-80 items-center justify-center"
						onClick={() => {
							setInnerType((prev: string) => (prev === "password" ? "text" : "password"));
						}}>
						{innerType === "password" ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
					</button>
				)}
			</div>
		</div>
	);
};

export default PrimaryInput;
