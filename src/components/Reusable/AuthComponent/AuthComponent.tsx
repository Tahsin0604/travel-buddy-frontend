import { useGetMYProfileQuery } from "@/redux/api/myProfile";
import { logoutUser } from "@/services/actions/logoutUser";
import { Avatar, Button, Tooltip } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AuthComponent = () => {
  const router = useRouter();
  const { data } = useGetMYProfileQuery({});
  const [userImage, setUserImage] = useState("");
  const [userName, setUserName] = useState("");
  useEffect(() => {
    setUserImage(data?.profilePhoto);
    setUserName(data?.name);
  }, [data]);
  const handleLogOut = () => {
    logoutUser(router);
  };
  return (
    <>
      {data ? (
        <>
          <Link href="/dashboard/profile">
            <Tooltip title={`${userName}`} placement="bottom">
              <Avatar src={userImage} />
            </Tooltip>
          </Link>

          <Button danger onClick={handleLogOut}>
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
