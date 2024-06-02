import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import Image from "next/image";

export default function CustomSlider({ images }: { images: string[] }) {
  return (
    <>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="w-full h-full"
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
      </Swiper>
    </>
  );
}
