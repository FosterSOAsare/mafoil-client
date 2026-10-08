import React from "react";

import filters from "@/data/productfilters";

type categoryFilterType = {
	selected: string;
	onSelect: (option: string) => void;
	sx?: string;
};

// Horizontally scrollable category pills, so the row never overflows on small screens
const CategoryFilter = ({ selected, onSelect, sx = "" }: categoryFilterType) => {
	return (
		<div className={`w-full mb-8 flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] ${sx}`}>
			{filters.map((filter) => (
				<button
					key={filter.option}
					className={`shrink-0 px-4 h-9 rounded-full border text-sm font-medium transition-colors duration-200 ${
						selected === filter.option ? "bg-black border-black text-white" : "border-black/20 text-black hover:border-brown hover:text-brown"
					}`}
					onClick={() => onSelect(filter.option)}>
					{filter.name}
				</button>
			))}
		</div>
	);
};

export default CategoryFilter;
