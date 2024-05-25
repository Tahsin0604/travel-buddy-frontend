import { Button } from "antd";

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
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-30">
        <h1 className="text-4xl text-white">Hello</h1>

        <Button href="/">Explore More</Button>
      </div>
    </section>
  );
};

export default Hero;
