"use client";
import baseApi from "@/redux/api/baseApi";
import { useGetMYProfileQuery } from "@/redux/api/myProfile";
import { useAppDispatch } from "@/redux/hook";
import { tagTypes } from "@/redux/tag-type";
import { logoutUser } from "@/services/actions/logoutUser";
import { getUserInfo } from "@/services/auth.services";
import { Avatar, Button, Tooltip } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AuthComponent = () => {
  const router = useRouter();
  const user = getUserInfo();
  const { data } = useGetMYProfileQuery({});
  // const dispatch = useAppDispatch();
  const [userImage, setUserImage] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserImage(data?.profilePhoto);
    setUserName(data?.name);
  }, [data]);
  const handleLogOut = async () => {
    await logoutUser(router);
    // dispatch(baseApi.util.invalidateTags([tagTypes.myProfile]));
  };
  return (
    <>
      {user?.id ? (
        <>
          {userImage && (
            <Link href="/dashboard/profile">
              <Tooltip title={`${userName}`} placement="bottom">
                <Avatar src={userImage} />
              </Tooltip>
            </Link>
          )}

          <Button danger onClick={() => handleLogOut()}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button href="/login">Login</Button>
        </>
      )}
    </>
  );
};

export default AuthComponent;
