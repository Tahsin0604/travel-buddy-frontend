"use client";

import { useGetAllUsersQuery } from "@/redux/api/adminApi";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Empty, List } from "antd";
import dayjs from "dayjs";

interface IDataType {
  userHref: string;
  userProfile: string;
  userName: string;
  useEmail: string;
  dateOfBirth: string;
}
const RecentUsers = () => {
  const { data, isLoading } = useGetAllUsersQuery({
    page: 1,
    limit: 4,
  });
  const users = data?.users as Record<string, any>[];

  const dataList: IDataType[] =
    users?.map((user, i) => ({
      userHref: `/profile/${user?.userId}`,
      userProfile: user?.profile?.profilePhoto,
      userName: user?.name,
      useEmail: user?.email,
      dateOfBirth: dayjs(user?.profile?.dateOfBirth, "YYYY-MM-DD")
        .format("DD MMM YY")
        .toUpperCase(),
    })) || [];
  return (
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
          </div>
        </List.Item>
      )}
      locale={{
        emptyText: <Empty description="No user registered yet"></Empty>,
      }}
    />
  );
};

export default RecentUsers;
