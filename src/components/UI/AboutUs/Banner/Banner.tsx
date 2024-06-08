import assets from "@/assets";
import Image from "next/image";

const Banner = () => {
  return (
    <section className="relative h-[70vh] w-full">
      <Image
        src={assets.images.aboutUs}
        alt="about us"
        sizes="100vw"
        quality={100}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-30 text-center">
        <h1 className="text-4xl md:text-8xl font-extrabold text-white">
          ABOUT US
        </h1>
      </div>
    </section>
  );
};

export default Banner;
