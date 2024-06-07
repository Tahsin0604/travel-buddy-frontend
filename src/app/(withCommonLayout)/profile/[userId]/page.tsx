"use client";
import assets from "@/assets";
import PaginationComponent from "@/components/Reusable/PaginationComponent/PaginationComponent";
import Loading from "@/components/UI/Loading";
import TripCard from "@/components/UI/TripCard/TripCard";
import { useGetUserProfileQuery } from "@/redux/api/profile";
import { useGetAllMyTripsQuery } from "@/redux/api/tripsApi";
import { Col, Row } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";

const ProfilePage = ({
  params: { userId },
}: {
  params: { userId: string };
}) => {
  const [page, setPage] = useState(1);

  const { data: profile, isLoading: profileLoading } =
    useGetUserProfileQuery(userId);

  const { data, isLoading: userTripLoading } = useGetAllMyTripsQuery({
    userId: userId,
    args: { page: page },
  });

  if (profileLoading && userTripLoading) {
    return (
      <div className="flex justify-center mt-36">
        <Loading />
      </div>
    );
  }

  const trips = data?.trips as Record<string, any>[];
  const meta = data?.meta as Record<string, any>;

  return (
    <div className="custom-container py-20">
      <Row gutter={[12, 12]}>
        <Col xs={24} md={8}>
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="w-64 h-72 relative rounded-md drop-shadow-md overflow-hidden">
              {profile?.profilePhoto ? (
                <Image src={profile?.profilePhoto} alt="profile" fill={true} />
              ) : (
                <Image src={assets.images.upload} alt="profile" fill={true} />
              )}
            </div>
          </div>
        </Col>
        <Col xs={24} md={14}>
          <div className="space-y-5">
            <p className="text-slate-700 font-semibold text-lg">
              Name :{" "}
              <span className="text-slate-800 font-semibold text-lg ">
                {profile?.name}
              </span>
            </p>
            <p className="text-slate-700 font-semibold text-lg ">
              Email :{" "}
              <span className="text-slate-800 font-semibold text-lg ">
                {profile?.email}
              </span>
            </p>
            <p className="text-slate-700 font-semibold text-lg ">
              Date of Birth :{" "}
              <span className="text-slate-800 font-semibold text-lg ">
                {dayjs(profile?.dateOfBirth, "YYYY-MM-DD")
                  .format("DD MMM YY")
                  .toUpperCase()}
              </span>
            </p>
            <p className="text-slate-700 font-semibold text-lg ">
              Bio :{" "}
              <span className="text-slate-800 font-semibold text-lg ">
                {profile?.bio ?? ""}
              </span>
            </p>
          </div>
        </Col>
      </Row>
      <div className="mt-8">
        <p className="text-center text-5xl text-slate-800 font-extrabold">
          Trips
        </p>
        <div className="mt-16 grid grid-cols-12 gap-5">
          {trips?.map((trip: Record<string, any>) => (
            <div
              key={trip?.id}
              className="col-span-12 md:col-span-6 lg:col-span-3 "
            >
              <TripCard trip={trip} />
            </div>
          ))}
        </div>
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
  );
};

export default ProfilePage;
