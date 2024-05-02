import React from "react";

const TestimonialCard = ({ user, testimony }: { user: string; testimony: string }) => {
	return (
		<div className="w-full text-center">
			<h3 className="text-xl md:text-3xl mb-4">“{testimony}“</h3>
			<p className="uppercase font-bold">{user}</p>
		</div>
	);
};

export default TestimonialCard;
