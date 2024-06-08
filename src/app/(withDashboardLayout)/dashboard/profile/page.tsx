"use client";
import assets from "@/assets";
import Loading from "@/components/UI/Loading";
import {
  useGetMYProfileQuery,
  useUpdateMYProfileMutation,
} from "@/redux/api/profile";
import { Button, Col, Row } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import UpdateProfile from "./components/UpdateProfile";
import CloudinaryUpload from "@/components/Cloudinary/CloudinaryUpload";
import dayjs from "dayjs";
import { getUserInfo } from "@/services/auth.services";
import AllTripRequest from "./components/AllTripRequest";
import AllTrips from "./components/AllTrips";

const ProfilePage = () => {
  const [resource, setResource] = useState<any>("");
  const [imageSrc, setImageSrc] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const { data: profile, isLoading } = useGetMYProfileQuery({});
  const userData = getUserInfo();
  const role = userData?.role;
  const [updateMYProfile, { isLoading: updateLoading }] =
    useUpdateMYProfileMutation();
  useEffect(() => {
    if (resource) {
      setImageSrc(resource?.secure_url);
    } else {
      setImageSrc(profile?.profilePhoto);
    }
  }, [resource, profile]);
  const uploadImage = async () => {
    const res = await updateMYProfile({
      profile: {
        profilePhoto: imageSrc,
      },
    });

    setResource("");
  };
  const profileData = profile
    ? {
        name: profile?.name,
        email: profile?.email,
        profile: {
          dateOfBirth: profile?.dateOfBirth,
          bio: profile?.bio,
        },
      }
    : {};
  if (isLoading) {
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <Loading />
      </div>
    );
  }
  return (
    <div>
      <UpdateProfile
        open={openDrawer}
        setOpen={setOpenDrawer}
        profileData={profileData}
      />
      <Row gutter={[12, 12]}>
        <Col xs={24} md={8}>
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="w-52 h-52 relative rounded-md drop-shadow-md overflow-hidden">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt="profile"
                  fill={true}
                  sizes="100vw"
                  placeholder="blur"
                  quality={100}
                  className="object-cover"
                />
              ) : (
                <Image
                  src={assets.images.upload}
                  alt="profile"
                  fill={true}
                  sizes="100vw"
                  placeholder="blur"
                  quality={100}
                  className="object-cover"
                />
              )}
            </div>
            <CloudinaryUpload setResource={setResource} />
            <Button
              type="primary"
              size="large"
              disabled={resource === "" || updateLoading}
              onClick={() => uploadImage()}
            >
              Save Profile Picture
            </Button>
            <Button
              onClick={() => {
                setOpenDrawer(true);
              }}
              size="large"
              type="primary"
              className="mt-8"
            >
              Update Profile
            </Button>
          </div>
        </Col>
        <Col xs={24} md={14}>
          <div className="space-y-5">
            <p className="text-slate-700 font-semibold text-lg">
              Name :{" "}
              <span className="text-slate-800 font-semibold text-lg">
                {profile?.name}
              </span>
            </p>
            <p className="text-slate-700 font-semibold text-lg">
              Email :{" "}
              <span className="text-slate-800 font-semibold text-lg">
                {profile?.email}
              </span>
            </p>
            <p className="text-slate-700 font-semibold text-lg">
              Date of Birth :{" "}
              <span className="text-slate-800 font-semibold text-lg">
                {dayjs(profile?.dateOfBirth, "YYYY-MM-DD")
                  .format("DD MMM YY")
                  .toUpperCase()}
              </span>
            </p>
            <p className="text-slate-700 font-semibold text-lg">
              Bio :{" "}
              <span className="text-slate-800 font-semibold text-lg">
                {profile?.bio ?? ""}
              </span>
            </p>
          </div>
        </Col>
      </Row>
      {role === "USER" && (
        <div className="grid grid-cols-12 gap-6 my-8">
          <div className="col-span-12 lg:col-span-6 space-y-7 p-4 bg-slate-50 rounded-md">
            <p className="text-slate-700 font-semibold text-lg text-center">
              Trip Request History
            </p>
            <div className="rounded-md bg-white py-1">
              <AllTripRequest />
            </div>
            <div className="flex justify-end">
              <Button
                type="link"
                size="large"
                href="/dashboard/user/my-trip-request"
              >
                Show More
              </Button>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6 space-y-7 p-4 bg-slate-50 rounded-md">
            <p className="text-slate-700 font-semibold text-lg text-center">
              Trip Post
            </p>
            <div className="rounded-md bg-white py-1">
              <AllTrips />
            </div>
            <div className="flex justify-end">
              <Button
                type="link"
                size="large"
                href="/dashboard/user/my-trip-request"
              >
                Show More
              </Button>
            </div>
          </div>
        </div>
      )}
      {role === "ADMIN" && (
        <div className="grid grid-cols-12 gap-6 my-8">
          <div className="col-span-12 lg:col-span-6 space-y-7 p-4 bg-slate-50 rounded-md">
            <p className="text-slate-700 font-semibold text-lg text-center">
              All Users
            </p>
            <div className="rounded-md bg-white py-1">
              <AllTripRequest />
            </div>
            <div className="flex justify-end">
              <Button
                type="link"
                size="large"
                href="/dashboard/user/my-trip-request"
              >
                Show More
              </Button>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6 space-y-7 p-4 bg-slate-50 rounded-md">
            <p className="text-slate-700 font-semibold text-lg text-center">
              All trips
            </p>
            <div className="rounded-md bg-white py-1">
              <AllTrips />
            </div>
            <div className="flex justify-end">
              <Button
                type="link"
                size="large"
                href="/dashboard/user/my-trip-request"
              >
                Show More
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
