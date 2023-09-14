import React from "react";
import { UseFormRegister, FieldValues } from "react-hook-form/dist/types";

type primaryTextAreaType = {
	label?: string;
	name: string;
	placeholder?: string;
	register: UseFormRegister<FieldValues>;
	sx?: string;
};

const PrimaryTextArea = ({ name, label, placeholder, register, sx = "" }: primaryTextAreaType) => {
	return (
		<div className="w-full h-auto overflow-hidden">
			{label && (
				<label htmlFor={name} className="block w-full font-semibold mb-[2px]">
					{label}
				</label>
			)}
			<div className="w-full h-auto overflow-hidden flex items-center py-[2px] mb-4 px-2 pl-3 justify-between border-[1px] border-[#000000c2]">
				<textarea id={name} className={`w-full py-[2px] h-24 resize-none focus:outline-none  text-black ${sx}`} placeholder={placeholder || ""} {...register(name)}></textarea>
			</div>
		</div>
	);
};

export default PrimaryTextArea;
