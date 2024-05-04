/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Ratings = ({ rating = 0, totalRatings = 0, sx = "", showTotal = true }: { rating: number; totalRatings?: number; sx?: string; showTotal?: boolean }) => {
	const [stars, setStars] = useState<string[]>([]);
	useEffect(() => {
		setStars([]);
		for (let i = 0; i < rating; i++) {
			setStars((prev: string[]) => [...prev, "filled"]);
		}
		for (let i = rating; i < 5; i++) {
			setStars((prev: string[]) => [...prev, "empty"]);
		}
	}, [rating]);

	return (
		<div className={`w-auto flex items-center text-sm text-[#FFA525] ${sx}`}>
			{stars.map((star, index) => {
				return star === "filled" ? <AiFillStar key={index} className="" /> : <AiFillStar key={index} className="text-[#BBBBBB]" />;
			})}
			{showTotal && typeof totalRatings == "number" && <p className="text-black text-[12px] ml-[3px] opacity-70">({totalRatings})</p>}
		</div>
	);
};

export default Ratings;
