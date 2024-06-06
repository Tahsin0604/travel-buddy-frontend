"use client";
import PaginationComponent from "@/components/Reusable/PaginationComponent/PaginationComponent";
import TripCard from "@/components/UI/TripCard/TripCard";
import TripCardSkeleton from "@/components/UI/TripCard/TripCardSkeleton";
import { useGetAllMyTripsQuery } from "@/redux/api/tripsApi";
import { getUserInfo } from "@/services/auth.services";
import { Divider } from "antd";
import { ReactNode, useState } from "react";

const MyTripsPage = () => {
  const [page, setPage] = useState(1);
  const userData = getUserInfo();
  const { data, isLoading } = useGetAllMyTripsQuery({
    userId: userData?.id,
    args: { page: page, limit: 12 },
  });
  const trips = data?.trips as Record<string, any>[];
  const meta = data?.meta as Record<string, any>;
  let renderComponent: ReactNode;
  if (isLoading) {
    renderComponent = (
      <>
        {Array.from({ length: 12 }, (v, i) => i).map((item) => (
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
            className="col-span-12 md:col-span-6 lg:col-span-3 h-full"
          >
            <TripCard trip={trip} owner={true} />
          </div>
        ))}
      </>
    );
  }
  return (
    <div className="px-4 md:px-8 lg:px-16">
      <div className="flex gap-6  py-6">
        <div className="w-full space-y-5">
          <div className=" flex justify-between items-centers">
            {trips && (
              <p className="text-slate-700 font-bold text-xl">
                <span className="text-sky-500">{meta?.total}</span> trips found
              </p>
            )}
          </div>
          <div className=" grid grid-cols-12 gap-4">{renderComponent}</div>
          <div className="flex justify-center item-center pt-6">
            {trips?.length > 0 && (
              <PaginationComponent
                total={meta?.total}
                current={meta?.page}
                limit={meta?.limit}
                setPage={setPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTripsPage;
