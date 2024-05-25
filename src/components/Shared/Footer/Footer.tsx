import Link from "next/link";
import {
  TwitterOutlined,
  InstagramOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import { Divider } from "antd";

const Footer = () => {
  return (
    <footer className="py-8 custom-container  bg-slate-100">
      <div className="flex space-y-3 flex-col md:flex-row md:justify-between items-center">
        <div>
          <Link href="/">
            <p className="text-slate-700 font-bold text-xl drop-shadow-md tracking-wide">
              <span className="text-sky-400 text-2xl italic">T</span>rip
              <span className="text-sky-400 text-2xl italic">B</span>uddy
            </p>
          </Link>
        </div>
        <nav className="hidden md:flex flex-wrap space-x-8 ">
          <Link href="/" className="text-normal font-semibold text-slate-700">
            <p>
              <small>Home</small>
            </p>
          </Link>
          <Link href="/" className="text-normal font-semibold text-slate-700">
            <p>
              <small>About Us</small>
            </p>
          </Link>
        </nav>
        <div className="flex gap-2">
          <button className="px-2 py-1 rounded-full border border-slate-700 text-slate-700 hover:border-sky-700 hover:text-sky-700 transition-colors duration-200">
            <TwitterOutlined />
          </button>
          <button className="px-2 py-1 rounded-full border border-slate-700 text-slate-700 hover:border-sky-700 hover:text-sky-700 transition-colors duration-200">
            <FacebookOutlined />
          </button>
          <button className="px-2 py-1 rounded-full border border-slate-700 text-slate-700 hover:border-sky-700 hover:text-sky-700 transition-colors duration-200">
            <InstagramOutlined />
          </button>
        </div>
      </div>
      <Divider />
      <div className="text-center">
        <p>
          <small>Copyright 2024 © Owned by Trip Buddy.</small>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
