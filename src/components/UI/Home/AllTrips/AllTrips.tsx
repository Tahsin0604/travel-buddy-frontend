"use client";
import { useGetAllTripsQuery } from "@/redux/api/tripsApi";
import { Skeleton } from "antd";

import TripCard from "../../TripCard/TripCard";

const AllTrips = () => {
  const { data, isLoading } = useGetAllTripsQuery({ limit: 8, page: 0 });

  if (isLoading) {
    return (
      <div className="custom-container  grid grid-cols-12">
        {Array.from({ length: 8 }, (v, i) => i).map((item) => (
          <Skeleton key={item} active className="col-span-3" />
        ))}
      </div>
    );
  }
  const trips = data?.trips as Record<string, any>[];

  return (
    <div className="custom-container mb-16">
      <p className="text-center text-5xl text-slate-800 font-extrabold">
        Featured Trips
      </p>
      <div className="mt-16 grid grid-cols-12 gap-5">
        {trips.map((trip: Record<string, any>) => (
          <div
            key={trip?.id}
            className="col-span-12 md:col-span-6 lg:col-span-3"
          >
            <TripCard trip={trip} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTrips;
