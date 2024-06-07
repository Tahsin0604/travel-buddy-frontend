import assets from "@/assets";
import Image from "next/image";
import Link from "next/link";

const JoinUs = () => {
  return (
    <section className="relative h-[60vh] w-full">
      <Image
        src={assets.images.joinUs}
        alt="join us"
        fill={true}
        className=" w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-70 text-center px-10">
        <div className="flex justify-center items-center gap-6">
          <Link
            href="/dashboard/user/create-trips"
            className="text-xl  bg-[#4096FF] px-5 py-2  rounded-xl mt-6 text-white hover:scale-105 transition-transform duration-150"
          >
            CREATE A TRIP
          </Link>
          <Link
            href="/trips"
            className="text-xl px-5 py-2 rounded-xl mt-6 text-white bg-red-400 hover:scale-105 transition-transform duration-150"
          >
            JOIN A TRIP
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
