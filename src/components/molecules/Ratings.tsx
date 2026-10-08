/* eslint-disable react/prop-types */
import { AiFillStar } from "react-icons/ai";

const Ratings = ({ rating = 0, totalRatings = 0, sx = "", showTotal = true }: { rating: number; totalRatings?: number; sx?: string; showTotal?: boolean }) => {
	// Always five stars; averages like 3.6 are rounded to the nearest whole star
	const filled = Math.min(5, Math.max(0, Math.round(Number(rating) || 0)));
	const label = `Rated ${Number(rating || 0).toFixed(1)} out of 5`;

	return (
		<div className={`w-auto flex items-center text-sm text-[#FFA525] ${sx}`} role="img" aria-label={label} title={label}>
			{[0, 1, 2, 3, 4].map((index) => (
				<AiFillStar key={index} className={index < filled ? "" : "text-[#BBBBBB]"} aria-hidden="true" />
			))}
			{showTotal && typeof totalRatings == "number" && <p className="text-black text-[12px] ml-[3px] opacity-70">({totalRatings})</p>}
		</div>
	);
};

export default Ratings;
