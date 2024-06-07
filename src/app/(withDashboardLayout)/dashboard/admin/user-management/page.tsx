"use client";
import PaginationComponent from "@/components/Reusable/PaginationComponent/PaginationComponent";
import { useGetAllUsersQuery } from "@/redux/api/adminApi";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Empty, List, Skeleton, Space } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";

interface IDataType {
  userHref: string;
  userProfile: string;
  userName: string;
  useEmail: string;
  dateOfBirth: string;
  status: string;
}
const UserManagementPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetAllUsersQuery({
    page: page,
    limit: 2,
  });
  const users = data?.users as Record<string, any>[];
  const meta = data?.meta as Record<string, any>;
  console.log(meta);
  const dataList: IDataType[] =
    users?.map((user, i) => ({
      userHref: `/profile/${user?.userId}`,
      userProfile: user?.profile?.profilePhoto,
      userName: user?.name,
      useEmail: user?.email,
      dateOfBirth: dayjs(user?.profile?.dateOfBirth, "YYYY-MM-DD")
        .format("DD MMM YY")
        .toUpperCase(),
      status: user?.status,
    })) || [];
  return (
    <div>
      <List
        itemLayout="vertical"
        size="large"
        loading={isLoading}
        dataSource={dataList}
        renderItem={(item) => (
          <List.Item key={item.useEmail}>
            <List.Item.Meta
              avatar={
                <>
                  {item?.userProfile ? (
                    <Avatar src={item?.userProfile} />
                  ) : (
                    <Avatar icon={<UserOutlined />} />
                  )}
                </>
              }
              title={<a href={item?.userHref}>{item?.userName}</a>}
            />
            <div>
              <p>Email: {item?.useEmail}</p>
              <p>Date of Birth: {item?.dateOfBirth}</p>
              <p
                className={` my-2 ${
                  item?.status === "BLOCKED" ? "text-red-400" : "text-green-400"
                }`}
              >
                {" "}
                {item?.status === "BLOCKED" ? "True" : "False"}
              </p>
            </div>
          </List.Item>
        )}
        locale={{
          emptyText: <Empty description="No user registered yet"></Empty>,
        }}
      />
      <div className="flex justify-center item-center pt-6">
        {users?.length > 0 && (
          <PaginationComponent
            total={meta?.total}
            current={meta?.page}
            limit={meta?.limit}
            setPage={setPage}
          />
        )}
      </div>
    </div>
  );
};

export default UserManagementPage;
