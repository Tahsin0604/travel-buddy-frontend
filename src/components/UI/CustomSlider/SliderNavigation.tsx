import { Button } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { useSwiper } from "swiper/react";

const SliderNavigation = () => {
  const swiper = useSwiper();
  return (
    <div className="absolute inset-0 z-10 flex-col items-center justify-center h-full hidden group-hover:flex px-4">
      <div className="flex w-full items-center justify-between">
        <Button
          shape="circle"
          size="small"
          icon={<ChevronLeft />}
          onClick={(e) => {
            e.stopPropagation();
            swiper.slidePrev();
          }}
        />
        <Button
          shape="circle"
          size="small"
          icon={<ChevronRight />}
          onClick={(e) => {
            e.stopPropagation();
            swiper.slideNext();
          }}
        />
      </div>
    </div>
  );
};

export default SliderNavigation;
