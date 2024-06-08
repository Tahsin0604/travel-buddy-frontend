import assets from "@/assets";
import Image from "next/image";
import React from "react";

const OurTeam = () => {
  const teams = [
    {
      imageUrl: assets.images.person1,
      name: "Alex",
      designation: "CEO",
      bio: "Alex is a seasoned explorer with a passion for discovering hidden gems away from the tourist trails. At Trip Buddy, he is dedicated to fostering a community of like-minded travelers.",
    },
    {
      imageUrl: assets.images.person2,
      name: "Maya",
      designation: "Head of Growth",
      bio: "Maya excels in scaling startups through innovative strategies and enjoys combining problem-solving with her love for cultural exploration and storytelling.",
    },
    {
      imageUrl: assets.images.person3,
      name: "Leo",
      designation: "Head of Product",
      bio: "Leo's creative vision and design expertise are evident across Trip Buddy's platform, playing a vital role in enhancing user experiences and driving daily operations.",
    },
    {
      imageUrl: assets.images.person4,
      name: "Amir",
      designation: "Head of Supply & Online Marketplace",
      bio: "Amir is an expert in scaling startups and solving complex problems. Outside of work, he loves traveling with his loyal dog, Max, exploring new and exciting destinations.",
    },
    {
      imageUrl: assets.images.person5,
      name: "Tahsin",
      designation: "Developer",
      bio: "Tahsin is a fullstack developer with a focus on building robust backend systems. He started contributing to Trip Buddy during his master's program in computer science.",
    },
    {
      imageUrl: assets.images.person6,
      name: "Emma",
      designation: "Head of Social Media",
      bio: "Emma, who grew up in Bali, is passionate about marketing and trend analysis. She travels extensively, always on the hunt for the best culinary experiences each country has to offer.",
    },
  ];

  return (
    <div className="custom-container my-20 text-center">
      <p className="text-2xl md:text-5xl font-extrabold text-slate-700 mb-10">
        Our Teams
      </p>
      <div className="grid grid-cols-12 gap-8">
        {teams.map((team, i) => (
          <div key={i} className="col-span-12 md:col-span-6 lg:col-span-4">
            <div className="flex justify-center mb-5">
              <div className="h-56 w-52 relative">
                <Image
                  fill={true}
                  sizes="100vw"
                  quality={100}
                  src={team.imageUrl}
                  alt={team.name}
                  className="rounded-md object-cover"
                />
              </div>
            </div>
            <p className="text-xl font-semibold text-slate-700 mb-3">
              {team.name}
            </p>
            <p className="text-xs  text-slate-400 mb-5">{team.designation}</p>
            <p className=" text-slate-600 mb-5">{team.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;
