"use client";
import assets from "@/assets";
import Loading from "@/components/UI/Loading";
import {
  useGetMYProfileQuery,
  useUpdateMYProfileMutation,
} from "@/redux/api/myProfile";
import { Button, Col, Row } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import UpdateProfile from "./components/UpdateProfile";
import CloudinaryUpload from "@/components/Cloudinary/CloudinaryUpload";

const ProfilePage = () => {
  const [resource, setResource] = useState<any>("");
  const [imageSrc, setImageSrc] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const { data: profile, isLoading } = useGetMYProfileQuery({});
  console.log(profile);
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
    console.log(res);
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
            <div className="w-64 h-72 relative rounded-md drop-shadow-md overflow-hidden">
              {imageSrc ? (
                <Image src={imageSrc} alt="profile" fill={true} />
              ) : (
                <Image src={assets.images.upload} alt="profile" fill={true} />
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
            <p className="text-slate-800 font-extrabold text-xl font-mono">
              Name :{" "}
              <span className="text-slate-600 font-semibold font-sans">
                {profile?.name}
              </span>
            </p>
            <p className="text-slate-800 font-extrabold text-xl font-mono">
              Email :{" "}
              <span className="text-slate-600 font-semibold font-sans">
                {profile?.email}
              </span>
            </p>
            <p className="text-slate-800 font-extrabold text-xl font-mono">
              Date of Birth :{" "}
              <span className="text-slate-600 font-semibold font-sans">
                {profile?.dateOfBirth}
              </span>
            </p>
            <p className="text-slate-800 font-extrabold text-xl font-mono">
              Bio :{" "}
              <span className="text-slate-600 font-semibold font-sans">
                {profile?.bio ?? ""}
              </span>
            </p>
          </div>
        </Col>
      </Row>
      <div></div>
    </div>
  );
};

export default ProfilePage;
