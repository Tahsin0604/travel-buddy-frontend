import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import SliderNavigation from "./SliderNavigation";

export default function CustomSlider({ images }: { images: string[] }) {
  return (
    <>
      <Swiper
        navigation={true}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        modules={[Pagination]}
        className="w-full h-full relative group"
        loop={true}
      >
        {images?.map((image, index) => (
          <SwiperSlide key={index} className="w-full h-full relative">
            <Image
              src={image}
              fill={true}
              alt={`image ${index + 1}`}
              className="h-full w-full"
            />
          </SwiperSlide>
        ))}
        <SliderNavigation></SliderNavigation>
      </Swiper>
    </>
  );
}
