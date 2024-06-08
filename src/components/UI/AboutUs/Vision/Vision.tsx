import assets from "@/assets";
import Image from "next/image";

const Vision = () => {
  return (
    <section className="relative h-[70vh] md:h-[60vh] w-full">
      <Image
        src={assets.images.vision}
        alt="vision"
        sizes="100vw"
        placeholder="blur"
        quality={100}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-70 text-center px-10">
        <div className="space-y-7">
          <div className="space-y-2">
            <h2 className="text-white font-semibold text-2xl">Our Vision</h2>
            <p className="text-white">
              Empower everyone to travel effortlessly in groups and connect
              meaningfully.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-white font-semibold text-2xl">Our Mission</h2>
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
