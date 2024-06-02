import Sider from "antd/es/layout/Sider";
import Link from "next/link";
import MenuBar from "../Menu/Menu";

const Sidebar = () => {
  return (
    <Sider
      theme="light"
      breakpoint="lg"
      collapsedWidth="0"
      trigger={null}
      style={{
        height: "100vh",
        position: "sticky",
        left: 0,
        bottom: 0,
        top: 0,
        zIndex: 60,
      }}
    >
      <div className="text-center flex justify-center mb-8">
        <Link href="/">
          <p className="text-slate-700 font-bold text-3xl drop-shadow-md tracking-wide">
            <span className="text-sky-400 text-4xl italic">T</span>rip
            <span className="text-sky-400 text-4xl italic">B</span>uddy
          </p>
        </Link>
      </div>
      <MenuBar />
    </Sider>
  );
};

export default Sidebar;
