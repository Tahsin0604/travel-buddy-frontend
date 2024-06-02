import { Button } from "antd";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative h-[80vh] w-full">
      <video
        src="/hero.mp4"
        muted
        autoPlay
        loop
        typeof="video/mp4"
        className=" w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-30 text-center">
        <h1 className="text-4xl md:text-8xl font-extrabold text-white">
          FIND A TRAVEL BUDDY
        </h1>
        <p className="text-2xl font-bold text-white">
          Share your adventures with a travel companion.
        </p>
        <Link
          href="/trips"
          className="text-lg  border-2 border-[#4096FF] px-5 py-2 bg-white rounded-md mt-6 text-[#4096FF] hover:scale-105 transition-transform duration-150"
        >
          Explore More
        </Link>
      </div>
    </section>
  );
};

export default Hero;
