
export const goPrev = (swiperRef: React.MutableRefObject<any>) => {
  if (swiperRef.current && swiperRef.current.swiper) {
    swiperRef.current.swiper.slidePrev();
  }
};

export const goNext = (swiperRef: React.MutableRefObject<any>) => {
  if (swiperRef.current && swiperRef.current.swiper) {
    swiperRef.current.swiper.slideNext();
  }
};