"use client";
import { useGetAllTripsQuery } from "@/redux/api/tripsApi";
import { Avatar, Badge, Skeleton } from "antd";
import Link from "next/link";
import CustomSlider from "../../CustomSlider/CustomSlider";
import { MapPin } from "lucide-react";
import { UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
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

  return (
    <div className="custom-container mb-16">
      <p className="text-center text-5xl text-slate-800 font-extrabold">
        Featured Trips
      </p>
      <div className="mt-16 grid grid-cols-12 gap-5">
        {data.map((trip: Record<string, any>) => (
          <div className="col-span-12 md:col-span-6 lg:col-span-3 ">
            <TripCard key={trip?.id} trip={trip} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTrips;
