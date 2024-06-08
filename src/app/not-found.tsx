import { Button } from "antd";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex h-screen flex-col justify-center items-center">
      <h1 className="text-red-600 font-bold text-7xl mb-20">
        404!!! Page Not Found!!!
      </h1>
      <Button type="primary" href="/">
        Go To Home Page
      </Button>
    </div>
  );
};

export default NotFoundPage;
