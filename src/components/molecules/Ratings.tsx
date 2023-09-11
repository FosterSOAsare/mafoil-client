/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Ratings = ({ rating }: { rating: number }) => {
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
		<div className="w-auto flex items-center ">
			{stars.map((star, index) => {
				return star === "filled" ? <AiFillStar key={index} className="text-secondary" /> : <AiOutlineStar key={index} />;
			})}
			<p className="text-3">({rating})</p>
		</div>
	);
};

export default Ratings;
