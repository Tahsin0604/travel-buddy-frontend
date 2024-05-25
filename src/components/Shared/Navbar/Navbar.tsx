"use client";
import { Button } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="custom-container py-3 z-40 sticky top-0 bg-white flex justify-between items-center border-b border-slate-400 shadow-sm shadow-sky-100">
        <Link href="/">
          <p className="text-slate-700 font-bold text-xl drop-shadow-md tracking-wide">
            <span className="text-sky-400 text-2xl italic">T</span>rip
            <span className="text-sky-400 text-2xl italic">B</span>uddy
          </p>
        </Link>
        <nav className="space-x-7 hidden md:flex items-center">
          <Link
            href="/"
            className={`font-bold hover:text-sky-300 transition-all ease-in-out delay-150 ${
              pathname === "/" ? "text-sky-400" : "text-slate-700"
            }`}
          >
            Home
          </Link>
          <Link
            href="/"
            className={`font-bold hover:text-sky-300  transition-all ease-in-out delay-150 ${
              pathname === "/about-us" ? "text-sky-400" : "text-slate-700"
            }`}
          >
            About Us
          </Link>
          <Link
            href="/"
            className={`font-semibold hover:text-sky-300 transition-all ease-in-out delay-150  ${
              pathname === "/dashboard/profile"
                ? "text-sky-400"
                : "text-slate-700"
            }`}
          >
            Profile
          </Link>
          <Button type="primary">Login</Button>
        </nav>
        <div className=" md:hidden">
          {!open ? (
            <MenuOutlined
              className="cursor-pointer text-lg font-semibold hover:text-sky-700 md:hidden"
              onClick={() => {
                setOpen(!open);
              }}
            />
          ) : (
            <CloseOutlined
              className="cursor-pointer text-lg font-semibold hover:text-sky-700 md:hidden"
              onClick={() => {
                setOpen(!open);
              }}
            />
          )}
        </div>
      </div>

      <nav
        className={`space-y-7 bg-white z-30 w-full transition-all duration-300 delay-500  fixed  left-0 flex flex-col items-center border-b shadow-sm shadow-sky-100 py-4 ${
          open ? "top-14" : "-top-40 opacity-0"
        }`}
      >
        <Link
          href="/"
          className={`font-bold hover:text-sky-300 transition-all ease-in-out delay-150 ${
            pathname === "/" ? "text-sky-400" : "text-slate-700"
          }`}
        >
          Home
        </Link>
        <Link
          href="/"
          className={`font-bold hover:text-sky-300  transition-all ease-in-out delay-150 ${
            pathname === "/about-us" ? "text-sky-400" : "text-slate-700"
          }`}
        >
          About Us
        </Link>
        <Link
          href="/"
          className={`font-semibold hover:text-sky-300 transition-all ease-in-out delay-150  ${
            pathname === "/dashboard/profile"
              ? "text-sky-400"
              : "text-slate-700"
          }`}
        >
          Profile
        </Link>
        <Button type="primary">Login</Button>
      </nav>
    </>
  );
};

export default Navbar;
