/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import CustomSlider from "@/components/UI/CustomSlider/CustomSlider";
import Loading from "@/components/UI/Loading";
import { TravelStatus } from "@/constants/trips";
import { useGetStatusForATripRequestQuery } from "@/redux/api/travelBuddyApi";
import { useGetTripDetailsQuery } from "@/redux/api/tripsApi";
import { getUserInfo, isLoggedIn } from "@/services/auth.services";
import {
  CalendarFilled,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button } from "antd";
import dayjs from "dayjs";
import { ArrowRight, Clock, Earth, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import BuddyList from "./component/BuddyList";
import Link from "next/link";

const TripDetailsPage = ({
  params: { tripId },
}: {
  params: { tripId: string };
}) => {
  const loggedIn = isLoggedIn();
  const userData = getUserInfo();
  const [showRequestButton, setShowRequestButton] = useState(true);
  const [isCreator, setIsCreator] = useState(false);

  const { data: tripStatus } = useGetStatusForATripRequestQuery(tripId, {
    skip: !loggedIn,
  });
  const { data: trip, isLoading: tripDetailsLoading } =
    useGetTripDetailsQuery(tripId);

  useEffect(() => {
    let status = true;
    if (trip?.userId === userData?.id) {
      status = false;
    }
    if (tripStatus?.status) {
      status = false;
    }
    if (userData?.role === "ADMIN") {
      status = false;
    }
    setShowRequestButton(status);
  }, [trip, tripStatus]);

  useEffect(() => {
    if (trip?.userId === userData?.id) {
      console.log(trip?.userId === userData?.id);
      console.log(trip?.userId, userData?.id);
      setIsCreator(true);
    }
  }, [trip]);

  if (tripDetailsLoading) {
    return (
      <div className="flex justify-center mt-36">
        <Loading />
      </div>
    );
  }

  const stepsData: {
    title: string;
    description: string;
  }[] = trip?.itinerary.map((item: Record<string, any>) => {
    let title;
    if (item.startDay === item.endDay) {
      title = `Day ${item.startDay}`;
    } else {
      title = `Day ${item.startDay} - Day ${item.endDay}`;
    }
    return {
      title: title,
      description: item.activities,
    };
  });

  return (
    <div>
      <div className="h-[50vh] lg:h-[80vh]">
        <CustomSlider images={trip?.images} />
      </div>

      <div className="custom-container">
        <div className="grid grid-cols-12  my-8 gap-6">
          <div className=" col-span-12 md:col-span-8 px-7 py-3">
            <h1 className="text-2xl md:text-4xl pr-8 font-extrabold font-serif ">
              {trip?.tripTitle}
            </h1>
            <div className="flex items-center gap-2 py-5">
              <p className="text-slate-500 font-light italic">Hosted by</p>

              {trip?.user?.profile?.profilePhoto ? (
                <Avatar src={trip?.user?.profile?.profilePhoto} />
              ) : (
                <Avatar icon={<UserOutlined />} />
              )}

              <Link
                href={`/profile/${trip?.userId}`}
                className=" text-slate-800 font-semibold "
              >
                {trip?.user?.name}
              </Link>
            </div>
            <div className="flex items-center gap-5 py-5">
              <div className="flex items-center gap-3">
                <Clock fill="#367fdd" color="white" />
                <p className="text-slate-600 font-semibold ">
                  {trip?.itinerary[trip?.itinerary.length - 1].endDay}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <MapPin fill="#367fdd" color="white" />
                <p className="text-slate-600 font-semibold ">
                  {trip?.destination}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Earth color="#367fdd" />
                <p className="text-slate-600 font-semibold ">
                  {trip?.tripType}
                </p>
              </div>
            </div>
            <article className="max-w-full prose">
              <div dangerouslySetInnerHTML={{ __html: trip?.description }} />
            </article>

            {stepsData && (
              <div>
                <p className="text-slate-800 font-bold text-lg mt-8 mb-4">
                  Trip Itinerary
                </p>
                {stepsData.map(
                  (
                    step: {
                      title: string;
                      description: string;
                    },
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="flex items-start gap-10 h-28 ml-5"
                    >
                      <div
                        className={` h-full w-full relative ${
                          index === stepsData.length - 1
                            ? ""
                            : "border-l-2 border-dotted border-sky-300"
                        }}`}
                      >
                        <div className="absolute top-0 -left-[18px] px-3 py-1 text-xl font-bold text-white rounded-full bg-sky-500 text-center">
                          {index + 1}
                        </div>
                        <div className="ml-8 flex flex-col flex-wrap">
                          <div className="flex justify-start">
                            <div className="flex items-center gap-5 px-4 py-2 text-slate-400 rounded-md bg-white border ">
                              <CalendarOutlined />
                              {step.title}
                            </div>
                          </div>
                          <div className="mt-4 text-slate-500 font-semibold ">
                            {step.description}
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          <div className="col-span-12 lg:col-span-4 px-7 py-3 relative">
            <div className=" lg:sticky lg:top-20">
              <div className="border rounded-md flex flex-col gap-5">
                <div className="flex gap-2 text-slate-400 px-5 py-3 border-b">
                  <CalendarFilled />
                  {dayjs(trip?.startDate, "YYYY-MM-DD")
                    .format("DD MMM YY")
                    .toUpperCase()}
                  <ArrowRight />
                  {dayjs(trip?.endDate, "YYYY-MM-DD")
                    .format("DD MMM YY")
                    .toUpperCase()}
                </div>
                <div className="flex justify justify-between items-center text-slate-800 text-xl font-semibold px-5 py-3">
                  <p>TOTAL PRICE</p>
                  <p>{trip?.budget}</p>
                </div>
                <div className="px-5 py-3 ">
                  {showRequestButton && (
                    <Button
                      size="large"
                      type="primary"
                      className=" w-full  "
                      href={`/trips/request/${tripId}`}
                    >
                      <div className="flex justify-center items-center gap-4">
                        <p>REQUEST TO JOIN</p>
                        <ArrowRight />
                      </div>
                    </Button>
                  )}
                  {tripStatus?.status === TravelStatus.PENDING && (
                    <p className=" text-xl font-semibold text-center bg-sky-300 text-white rounded">
                      Request pending
                    </p>
                  )}
                  {tripStatus?.status === TravelStatus.APPROVED && (
                    <p className="text-white rounded text-xl font-semibold text-center bg-lime-500">
                      Request approved
                    </p>
                  )}
                  {tripStatus?.status === TravelStatus.REJECTED && (
                    <p className="text-white rounded text-xl font-semibold text-center bg-red-500">
                      Request rejected
                    </p>
                  )}
                </div>
              </div>
              <>{isCreator && <BuddyList tripId={tripId} />}</>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetailsPage;
