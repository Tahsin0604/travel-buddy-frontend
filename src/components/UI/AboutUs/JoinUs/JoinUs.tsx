import assets from "@/assets";
import Image from "next/image";
import Link from "next/link";

const JoinUs = () => {
  return (
    <section className="relative h-[70vh] w-full">
      <Image
        src={assets.images.joinUs}
        alt="join us"
        sizes="100vw"
        quality={100}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-70 text-center px-10">
        <div className="text-center">
          <h1 className="text-2xl lg:text-4xl font-semibold mb-1 text-white">
            Share Your Journey and Unique Experiences.
          </h1>
          <h1 className="text-2xl lg:text-4xl font-semibold mb-8 text-white">
            Become Part of Our Community.
          </h1>
          <div className="flex justify-center items-center gap-6">
            <Link
              href="/dashboard/user/create-trips"
              className="text-base md:text-xl  bg-[#4096FF] px-4 md:px-7 py-2  rounded-3xl mt-6 text-white hover:scale-105 transition-transform duration-150"
            >
              CREATE A TRIP
            </Link>
            <Link
              href="/trips"
              className="text-base md:text-xl px-4 md:px-7 py-2 rounded-3xl mt-6 text-white bg-red-400 hover:scale-105 transition-transform duration-150"
            >
              JOIN A TRIP
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
