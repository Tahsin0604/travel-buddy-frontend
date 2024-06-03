import AllTrips from "@/components/UI/Home/AllTrips/AllTrips";
import Hero from "@/components/UI/Home/Hero/Hero";
import SearchBox from "@/components/UI/Home/SearchBox/SearchBox";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <SearchBox />
      <AllTrips />
    </div>
  );
};

export default HomePage;
