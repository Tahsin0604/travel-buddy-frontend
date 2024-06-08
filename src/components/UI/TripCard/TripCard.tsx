"use client";
import React from "react";
import CustomSlider from "../CustomSlider/CustomSlider";
import { MapPin } from "lucide-react";
import { Avatar, Badge, Button, Popconfirm, PopconfirmProps } from "antd";
import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import dayjs from "dayjs";
import { useDeleteTripMutation } from "@/redux/api/tripsApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const TripCard = ({
  trip,
  owner = false,
}: {
  trip: Record<string, any>;
  owner?: boolean;
}) => {
  const router = useRouter();
  const [deleteTrip, { isLoading }] = useDeleteTripMutation();
  const onDelete = async () => {
    const res = await deleteTrip(trip?.id);

    if (res.data.id) {
      toast.success(res?.data?.message);
      router.push("/dashboard/user/my-trips");
    }
  };

  const confirm: PopconfirmProps["onConfirm"] = (e) => {
    onDelete();
  };

  return (
    <div className="rounded-md shadow h-full">
      <Badge.Ribbon
        text={`$ ${trip?.budget}`}
        color="cyan"
        style={{ zIndex: 10 }}
      >
        <div className="overflow-hidden h-full">
          <div className="relative ">
            <div className="h-56 w-full rounded-t-md overflow-hidden">
              <CustomSlider images={trip?.images} />
            </div>
            <div className="absolute top-2 left-2 z-10">
              <div className="flex justify-center items-center text-sm gap-1 px-2 py-1 rounded-md shadow-md bg-white">
                <MapPin size={14} />
                <p>{trip?.destination}</p>
              </div>
            </div>
            <div className="absolute bottom-2 left-2 z-10 bg-white p-[2px] rounded-lg">
              {trip?.user?.profile?.profilePhoto ? (
                <Avatar
                  shape="square"
                  size="large"
                  src={trip?.user?.profile?.profilePhoto}
                />
              ) : (
                <Avatar shape="square" size="large" icon={<UserOutlined />} />
              )}
            </div>
          </div>
          <Link href={`/trips/${trip?.id}`} className="py-2 px-4 block">
            <p className="text-slate-500">
              with{"  "}
              <Link
                href={`/profile/${trip?.userId}`}
                className="underline  text-slate-700 font-semibold underline-offset-1"
              >
                {trip?.user?.name}
              </Link>
            </p>
            <p className="text-slate-800 text-lg py-3 font-bold hover:text-sky-700 transition-colors ease-in-out duration-150">
              {trip?.tripTitle.length > 40
                ? trip?.tripTitle.slice(0, 40).concat("...")
                : trip?.tripTitle}
            </p>
            <p className="text-slate-600 pb-2 font-semibold">
              {dayjs(trip?.startDate, "YYYY-MM-DD")
                .format("DD MMM YY")
                .toUpperCase()}{" "}
              &#8226; {trip?.itinerary[trip?.itinerary.length - 1]?.endDay} Days
            </p>
          </Link>
          {owner && (
            <div className="flex justify-end items-center gap-2 pr-4 pb-2">
              <Button
                size="small"
                icon={<EditOutlined color="blue" />}
                title="Approved"
                disabled={isLoading}
                href={`/dashboard/user/update-trips/${trip?.id}`}
              ></Button>
              <Popconfirm
                title="Delete the trip"
                placement="topRight"
                description="Are you sure to delete this trip?"
                onConfirm={confirm}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  size="small"
                  danger
                  icon={<DeleteOutlined color="red" />}
                  title="Delete"
                  disabled={isLoading}
                  style={{
                    zIndex: 10,
                  }}
                ></Button>
              </Popconfirm>
            </div>
          )}
        </div>
      </Badge.Ribbon>
    </div>
  );
};

export default TripCard;
