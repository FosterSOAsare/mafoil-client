import React from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";

type primarySelectType = {
	label?: string;
	name: string;
	placeholder?: string;
	register: UseFormRegister<FieldValues>;
	sx?: string;
	options: string[] | { option: string; name: string }[];
};

const PrimarySelect = ({ name, label, register, sx = "", options }: primarySelectType) => {
	return (
		<div className="w-full h-auto overflow-hidden">
			{label && (
				<label htmlFor={name} className="block w-full font-semibold mb-[2px]">
					{label}
				</label>
			)}
			<div className="w-full h-auto overflow-hidden flex items-center py-[2px] mb-4 px-2 pl-3 justify-between border border-[#000000c2]">
				<select id={name} className={`w-full py-[2px] h-12 resize-none focus:outline-hidden  text-black ${sx}`} {...register(name)}>
					{options?.map((option, index) => {
						let text = typeof option !== "string" ? option?.name : option;
						let value = typeof option !== "string" ? option?.option : option;
						return (
							<option key={index} className="px-6!" value={value}>
								{text}
							</option>
						);
					})}
				</select>
			</div>
		</div>
	);
};

export default PrimarySelect;
