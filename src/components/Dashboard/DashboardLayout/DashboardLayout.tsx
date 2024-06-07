"use client";
import { ReactNode, useState } from "react";
import { Layout, theme } from "antd";
import Sidebar from "../Sidebar/Sidebar";
import DrawerItems from "../DrawerItems/DrawerItems";
import { MenuOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import Link from "next/link";
const AuthButton = dynamic(
  () => import("../../Reusable/AuthComponent/AuthComponent"),
  { ssr: false }
);
const { Header, Content, Footer } = Layout;

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [visible, setVisible] = useState(false);

  return (
    <Layout style={{ height: "100%" }}>
      <Sidebar />
      <Layout>
        <Header
          style={{
            padding: "0px 20px",
            background: colorBgContainer,
            position: "sticky",
            right: 0,
            top: 0,
            zIndex: 50,
            boxShadow: "1px 2px 2px #778899",
          }}
        >
          <div className="flex justify-end items-center gap-4">
            <Link
              href="/trips"
              className={`font-bold hover:text-sky-300  transition-all ease-in-out delay-150 text-slate-700`}
            >
              Trips
            </Link>
            <AuthButton />
            <button onClick={() => setVisible(true)} className="lg:hidden">
              <MenuOutlined />
            </button>
          </div>
          <DrawerItems open={visible} setOpen={setVisible} />
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: "80vh",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Copyright {new Date().getFullYear()} © Owned by Trip Buddy.
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
