import assets from "@/assets";
import Image from "next/image";

const Vision = () => {
  return (
    <section className="relative h-[70vh] md:h-[60vh] lg:h-[50vh] w-full">
      <Image
        src={assets.images.vision}
        alt="about us"
        fill={true}
        className=" w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-60 text-center px-10">
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-white font-semibold text-xl">Our Vision</h2>
            <p className="text-white">
              Empower everyone to travel effortlessly in groups and connect
              meaningfully.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-white font-semibold text-xl">Our Mission</h2>
            <p className="text-white">
              Enable travelers to create, discover, and join unique group trips
              with like-minded people.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
