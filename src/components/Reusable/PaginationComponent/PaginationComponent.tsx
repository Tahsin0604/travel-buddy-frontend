"use client";
import { Pagination, PaginationProps } from "antd";
import React from "react";
type TProps = {
  current: number;
  total: number;
  limit: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const PaginationComponent = ({ current, total, limit, setPage }: TProps) => {
  const totalPage = Math.ceil(total / limit);
  console.log(totalPage);
  const onChange: PaginationProps["onChange"] = (pageNumber) => {
    setPage(pageNumber);
  };
  return (
    <Pagination
      showQuickJumper
      current={current}
      total={totalPage}
      onChange={onChange}
    />
  );
};

export default PaginationComponent;
