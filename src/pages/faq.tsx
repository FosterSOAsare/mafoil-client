import React from "react";

import faqData from "@/data/faq";

import Header from "@/components/molecules/Header";

interface faqType {
	index: number;
	question: string;
	answer: string;
}

const FaqItem = ({ index, question, answer }: faqType) => {
	return (
		<article className={`w-full flex flex-col md:flex-row justify-between items-stretch`}>
			<div className="w-full md:w-[48%]">
				{index % 2 == 0 && (
					<div className="bg-slate-100 p-4">
						<p className="text-[12px] w-5 h-5 mb-2 bg-black text-white flex items-center justify-center rounded-full">{index + 1}</p>
						<h3 className="text-xl font-medium">{question}</h3>
						<p className="text-sm mt-2">{answer}</p>
					</div>
				)}
			</div>
			<div className="hidden md:block w-[3px] bg-black"></div>
			<div className="w-full md:w-[48%]">
				{index % 2 == 1 && (
					<div className="bg-black text-white p-4">
						<p className="text-[12px] w-5 h-5 mb-2 bg-white text-black font-bold flex items-center justify-center rounded-full">{index + 1}</p>
						<h3 className="text-xl font-medium">{question}</h3>
						<p className="text-sm mt-2">{answer}</p>
					</div>
				)}
			</div>
		</article>
	);
};

const Faq = () => {
	return (
		<>
			<Header />
			<main className="w-full max-w-7xl mx-auto items-center md:px-4 justify-center py-8 flex flex-col">
				<h1 className="text-4xl uppercase font-bold">Faq</h1>

				<section className="w-full h-auto mt-8">
					{faqData?.map((faq, index) => (
						<FaqItem index={index} key={index} {...faq} />
					))}
				</section>
			</main>
		</>
	);
};

export default Faq;
