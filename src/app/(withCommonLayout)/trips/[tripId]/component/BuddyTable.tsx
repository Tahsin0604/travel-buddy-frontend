"use client";

import PaginationComponent from "@/components/Reusable/PaginationComponent/PaginationComponent";
import { TravelStatus } from "@/constants/trips";
import { useGetAllBuddyForATripsQuery } from "@/redux/api/travelBuddyApi";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { useState } from "react";

interface DataType {
  key: string;
  userProfile: string;
  userName: string;
  useEmail: number;
  contactNumber: string;
  status: string;
}

const BuddyTable = ({ tripId }: { tripId: string }) => {
  const [page, setPage] = useState(1);
  const { data, isFetching } = useGetAllBuddyForATripsQuery({
    tripId: tripId,
    args: { page: page, limit: 10 },
  });

  const buddy = data?.buddy as Record<string, any>[];
  const meta = data?.meta as Record<string, any>;

  const tableData = buddy?.map((item: Record<string, any>) => ({
    key: item?.id,
    userProfile: item?.user?.profile?.profilePhoto,
    userName: item?.userName,
    useEmail: item?.useEmail,
    contactNumber: item?.contactNumber,
    status: item?.status,
  }));

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Profile Pic",
      dataIndex: "userProfile",
      key: "userProfile",
      render: (item) => {
        console.log(item);
        return (
          <Space>
            {item ? <Avatar src={item} /> : <Avatar icon={<UserOutlined />} />}
          </Space>
        );
      },
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "User Email",
      dataIndex: "useEmail",
      key: "useEmail",
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {record.status === TravelStatus.PENDING && (
            <>
              <Button>Approved</Button>
              <Button>Rejected</Button>
            </>
          )}
          {record.status === TravelStatus.APPROVED && (
            <>
              <Button>Rejected</Button>
            </>
          )}
        </Space>
      ),
    },
  ];
  return (
    <div className="my-5">
      <Table
        loading={isFetching}
        pagination={false}
        columns={columns}
        dataSource={tableData}
      />
      <div className="flex justify-center item-center pt-6">
        {buddy?.length > 0 && (
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

export default BuddyTable;
