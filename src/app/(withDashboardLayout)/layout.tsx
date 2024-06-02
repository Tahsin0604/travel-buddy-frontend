"use client";
import DashboardLayout from "@/components/Dashboard/DashboardLayout/DashboardLayout";
import { ReactNode } from "react";

const DashboardRootLayout = ({ children }: { children: ReactNode }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default DashboardRootLayout;
