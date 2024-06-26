import Banner from "@/components/UI/AboutUs/Banner/Banner";
import JoinUs from "@/components/UI/AboutUs/JoinUs/JoinUs";
import OurTeam from "@/components/UI/AboutUs/OurTeam/OurTeam";
import Vision from "@/components/UI/AboutUs/Vision/Vision";

const AboutUsPage = () => {
  return (
    <div>
      <Banner />
      <div className="custom-container py-24 text-center">
        <p className="text-2xl md:text-5xl font-extrabold text-slate-700 mb-7">
          Solo Paths, United Adventure!
        </p>
        <p className=" text-slate-600 text-lg leading-relaxed">
          At Trip Buddy, we bring together explorers from all over the world
          through our distinctive group adventures.<br></br>
          Our mission is to provide everyone with the chance to discover
          incredible destinations globally!<br></br>
          Traveling with us means experiencing genuine, off-the-beaten-path
          journeys in small, close-knit groups, creating unforgettable memories.
          <br></br>
          Fueled by passion, we aim to make a difference - adventure by
          adventure!
          <br></br>
          Join us in making travel extraordinary and become part of our journey!
        </p>
      </div>
      <Vision />
      <OurTeam />
      <JoinUs />
    </div>
  );
};

export default AboutUsPage;
