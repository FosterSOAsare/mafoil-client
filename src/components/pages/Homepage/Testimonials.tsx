/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import testimonials, { testimonialType } from "@/data/testimonials";
import { goPrev, goNext } from "@/utils/swiper";

import TestimonialCard from "@/components/cards/TestimonialCard";

import { HiMiniArrowLongLeft, HiMiniArrowLongRight } from "react-icons/hi2";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const Testimonials = () => {
	const swiperRef = useRef<any>(null);

	return (
		<section id="testimonials" className="w-full py-6 pt-12  xl:py-32 h-auto px-4 md:px-10">
			<div className="w-full h-full  flex flex-col items-center justify-center relative">
				<div className="w-full  mx-auto h-full flex justify-between items-center gap-4">
					<button className={`hidden md:flex items-center justify-center hover:text-brown text-sec `} onClick={() => goPrev(swiperRef)}>
						<HiMiniArrowLongLeft className="text-2xl" />
					</button>
					<article className="h-full w-full md:w-4/5">
						<Swiper spaceBetween={30} slidesPerView={1} navigation autoplay={true} ref={swiperRef} loop={true} className="overflow-y-visible w-full h-full">
							{testimonials.map((testimonial: testimonialType, index: number) => (
								<SwiperSlide key={index} className=" w-full h-full">
									<TestimonialCard {...testimonial} />
								</SwiperSlide>
							))}
						</Swiper>
					</article>
					<button className={`hidden md:flex items-center hover:text-brown justify-center text-sec`} onClick={() => goNext(swiperRef)}>
						<HiMiniArrowLongRight className="text-2xl" />
					</button>
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
