import Hero from "@/components/UI/Home/Hero/Hero";
import SearchBox from "@/components/UI/Home/SearchBox/SearchBox";
import Trips from "@/components/UI/Home/Trips/Trips";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <SearchBox />
      <Trips />
    </div>
  );
};

export default HomePage;
