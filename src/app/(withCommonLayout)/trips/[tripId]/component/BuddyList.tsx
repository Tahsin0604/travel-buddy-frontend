/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { TravelStatus } from "@/constants/trips";
import {
  useGetAllBuddyForATripsQuery,
  useSendTripResponseMutation,
} from "@/redux/api/travelBuddyApi";
import { CheckOutlined, CloseOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Divider,
  List,
  Skeleton,
  Space,
  Table,
  Tag,
} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";

interface DataType {
  key: string;
  userProfile: string;
  userName: string;
  useEmail: string;
  userId: string;
  contactNumber: string;
  status: string;
  loading: boolean;
}

const BuddyList = ({ tripId }: { tripId: string }) => {
  const [page, setPage] = useState(1);
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState<DataType[]>([]);

  const { data, isFetching } = useGetAllBuddyForATripsQuery({
    tripId: tripId,
    args: { page: page, limit: 10 },
  });

  const [sendTripResponse, { isLoading: responseLoading }] =
    useSendTripResponseMutation();

  const loadMoreData = () => {
    setLoading(true);
    setPage(page + 1);
  };

  useEffect(() => {
    if (data && data.buddy) {
      const newData = (data.buddy as Record<string, any>[]).map(
        (item: Record<string, any>) => ({
          key: item.id,
          userProfile: item.user?.profile?.profilePhoto,
          userName: item.userName,
          useEmail: item.useEmail,
          contactNumber: item.contactNumber,
          userId: item.userId,
          status: item.status,
          loading: false,
        })
      );
      const dataToSet = [...listData, ...newData];
      setListData(dataToSet);
      setInitLoading(false);
    }
  }, [data]);

  const meta = data?.meta as Record<string, any>;

  const onResponse = async (id: string, response: string) => {
    const res = await sendTripResponse({
      buddyId: id,
      data: {
        status: response,
      },
    });
  };

  return (
    <div className="my-3 min-h-[400px] overflow-auto px-4 py-2 border rounded">
      <InfiniteScroll
        dataLength={listData.length}
        next={loadMoreData}
        hasMore={listData.length < meta?.total}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>No More</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          itemLayout="vertical"
          dataSource={listData}
          renderItem={(item) => (
            <List.Item>
              <Skeleton avatar title={false} loading={item.loading} active>
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
                  title={
                    <a href={`/profile/${item.userId}`}>{item?.userName}</a>
                  }
                  description={
                    <>
                      <p>Email: ${item.useEmail}</p>
                      <p>Contact Number: ${item.contactNumber} </p>
                    </>
                  }
                />
                <div className="my-4">
                  {item.status === TravelStatus.PENDING && (
                    <>requested to join</>
                  )}
                  {item.status === TravelStatus.APPROVED && (
                    <>request accepted</>
                  )}
                  {item.status === TravelStatus.REJECTED && <>request denied</>}
                </div>
                <div>
                  <Space size="middle">
                    {item.status === TravelStatus.PENDING && (
                      <>
                        <Button
                          size="small"
                          icon={<CheckOutlined />}
                          title="Approved"
                          disabled={responseLoading}
                          onClick={() =>
                            onResponse(item.key, TravelStatus.APPROVED)
                          }
                        ></Button>
                        <Button
                          size="small"
                          icon={<CloseOutlined />}
                          title="Rejected"
                          disabled={responseLoading}
                          onClick={() =>
                            onResponse(item.key, TravelStatus.REJECTED)
                          }
                        ></Button>
                      </>
                    )}
                    {item.status === TravelStatus.APPROVED && (
                      <>
                        <Button
                          size="small"
                          icon={<CloseOutlined />}
                          title="Rejected"
                          disabled={responseLoading}
                          onClick={() =>
                            onResponse(item.key, TravelStatus.REJECTED)
                          }
                        ></Button>
                      </>
                    )}
                  </Space>
                </div>
              </Skeleton>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

export default BuddyList;
