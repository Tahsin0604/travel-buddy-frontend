"use client";
import { useGetAllTripsQuery } from "@/redux/api/tripsApi";
import { Button, Skeleton } from "antd";

import TripCard from "../../TripCard/TripCard";
import TripCardSkeleton from "../../TripCard/TripCardSkeleton";
import { ReactNode } from "react";
import { ArrowRightOutlined } from "@ant-design/icons";

const AllTrips = () => {
  const { data, isLoading } = useGetAllTripsQuery({ limit: 8, page: 0 });
  const trips = data?.trips as Record<string, any>[];
  let renderComponent: ReactNode;

  if (isLoading) {
    renderComponent = (
      <>
        {Array.from({ length: 8 }, (v, i) => i).map((item) => (
          <div key={item} className="col-span-12 md:col-span-6 lg:col-span-3 ">
            <TripCardSkeleton />
          </div>
        ))}
      </>
    );
  } else {
    renderComponent = (
      <>
        {trips?.map((trip: Record<string, any>) => (
          <div
            key={trip?.id}
            className="col-span-12 md:col-span-6 lg:col-span-3 "
          >
            <TripCard trip={trip} />
          </div>
        ))}
      </>
    );
  }

  return (
    <div className="custom-container mt-10 mb-20">
      <p className="text-2xl md:text-5xl font-extrabold text-slate-700 mb-24 text-center">
        Featured Trips
      </p>
      <div className="mt-16 grid grid-cols-12 gap-5">{renderComponent}</div>
      <div className="flex justify-center mt-10">
        <Button
          icon={<ArrowRightOutlined />}
          iconPosition="end"
          size="large"
          href="/trips"
          style={{
            color: "blue",
          }}
        >
          Explore More
        </Button>
      </div>
    </div>
  );
};

export default AllTrips;
