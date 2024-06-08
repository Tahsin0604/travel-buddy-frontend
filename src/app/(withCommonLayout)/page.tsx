import AllTrips from "@/components/UI/Home/AllTrips/AllTrips";
import Hero from "@/components/UI/Home/Hero/Hero";
import SearchBox from "@/components/UI/Home/SearchBox/SearchBox";
import TravelWithUs from "@/components/UI/Home/TravelWithUs/TravelWithUs";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <SearchBox />
      <AllTrips />
      <TravelWithUs />
    </div>
  );
};

export default HomePage;
