"use client";
import CustomSlider from "@/components/UI/CustomSlider/CustomSlider";
import { TravelStatus } from "@/constants/trips";
import { useGetAllTripRequestQuery } from "@/redux/api/travelBuddyApi";
import { CalendarFilled, UserOutlined } from "@ant-design/icons";
import { Avatar, List, Space } from "antd";
import dayjs from "dayjs";
import { ArrowRight, Clock, Earth, MapPin } from "lucide-react";
import Link from "next/link";

interface TTrip {
  tripHref: string;
  title: string;
  tripImages: string[];
  budget: number;
  duration: number;
  destination: string;
  tripType: string;
  startDate: string;
  endDate: string;
  creatorName: string;
  creatorHref: string;
  avatar?: string;
  status: string;
}
const AllTripRequest = () => {
  const { data, isFetching } = useGetAllTripRequestQuery({
    page: 1,
    limit: 6,
  });

  const trips = data?.trips as Record<string, any>[];
  const meta = data?.meta as Record<string, any>;
  const dataList: TTrip[] =
    trips?.map((trip, i) => ({
      tripHref: `/trips/${trip?.tripId}`,
      title: trip?.trip?.tripTitle,
      tripImages: trip?.trip?.images,
      budget: trip?.trip?.budget,
      duration: trip?.trip?.itinerary[trip?.trip?.itinerary.length - 1].endDay,
      destination: trip?.trip?.destination,
      tripType: trip?.trip?.tripType,
      startDate: dayjs(trip?.trip?.startDate, "YYYY-MM-DD")
        .format("DD MMM YY")
        .toUpperCase(),
      endDate: dayjs(trip?.trip?.endDate, "YYYY-MM-DD")
        .format("DD MMM YY")
        .toUpperCase(),
      creatorName: trip?.trip?.user?.name,
      creatorHref: `/profile/${trip?.trip?.userId}`,
      avatar: trip?.trip?.user?.profile?.profilePhoto,
      status: trip?.status,
    })) || [];
  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        loading={isFetching}
        dataSource={dataList}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            extra={
              <div className="w-full h-40 rounded-md overflow-hidden">
                <CustomSlider images={item?.tripImages} />
              </div>
            }
          >
            <List.Item.Meta
              avatar={
                <>
                  {item?.avatar ? (
                    <Avatar src={item?.avatar} />
                  ) : (
                    <Avatar icon={<UserOutlined />} />
                  )}
                </>
              }
              title={<a href={item?.creatorHref}>{item?.creatorName}</a>}
            />
            <div>
              <Link
                href={item.tripHref}
                className="text-slate-800 text-lg py-3 font-bold hover:text-sky-700 transition-colors ease-in-out duration-150 inline-block"
              >
                {item?.title.length > 40
                  ? item?.title.slice(40).concat("...")
                  : item?.title}
              </Link>
              <div className="flex items-center gap-4 py-2">
                <div className="flex items-center gap-2">
                  <Clock fill="#367fdd" color="white" />
                  <p className="text-slate-600 font-semibold ">
                    {item?.duration} Days
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin fill="#367fdd" color="white" />
                  <p className="text-slate-600 font-semibold ">
                    {item?.destination}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Earth color="#367fdd" />
                  <p className="text-slate-600 font-semibold ">
                    {item?.tripType}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 text-slate-400 py-3 border-b">
                <CalendarFilled />
                {item?.startDate}
                <ArrowRight />
                {item?.endDate}
              </div>
              <p className="font-semibold mb-2">$ {item?.budget}</p>
              {item?.status === TravelStatus.PENDING && (
                <p className="font-semibold text-sky-300">Request pending</p>
              )}
              {item?.status === TravelStatus.APPROVED && (
                <p className="font-semibold  text-lime-500">Request approved</p>
              )}
              {item?.status === TravelStatus.REJECTED && (
                <p className="font-semibold  text-red-500">Request rejected</p>
              )}
            </div>
          </List.Item>
        )}
      />
    </>
  );
};

export default AllTripRequest;
