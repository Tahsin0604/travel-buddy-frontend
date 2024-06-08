import assets from "@/assets";
import Image from "next/image";
import React from "react";

const TravelWithUs = () => {
  const highlights = [
    {
      imageUrl: assets.images.travel1,
      title: "Discover Hidden Gems with Trip Buddy",
      subTitle:
        "Venture into off-the-beaten-path destinations and uncover unique experiences.",
    },
    {
      imageUrl: assets.images.travel2,
      title: "Meet Your Travel Companions in Advance",
      subTitle:
        "Get to know your Trip Buddy companions before your journey begins.",
    },
    {
      imageUrl: assets.images.travel3,
      title: "Choose Tours that Fit Your Budget",
      subTitle: "Find trips that match your budget and travel style.",
    },
  ];
  return (
    <div className="custom-container my-20">
      <p className="text-2xl md:text-5xl font-extrabold text-slate-700 mb-10  text-center">
        Discover Your Adventure
      </p>
      <div className="grid grid-cols-12 gap-8">
        {highlights.map((highlight, i) => (
          <div
            key={i}
            className="col-span-12 md:col-span-6 lg:col-span-4 rounded-md overflow-hidden"
          >
            <div className="relative h-[550px] w-full">
              <Image
                src={highlight.imageUrl}
                alt="about us"
                sizes="100vw"
                placeholder="blur"
                quality={100}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-end  bg-black bg-opacity-50 px-4 pb-5">
                <div>
                  <p className="text-white text-xl font-bold mb-3">
                    {highlight.title}
                  </p>
                  <p className="text-slate-300 text-lg font-semibold">
                    {highlight.subTitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelWithUs;
