"use client";
import { getUserInfo } from "@/services/auth.services";
import { TUserRole } from "@/types";
import { menuItems } from "@/utils/menuItems";
import { Menu } from "antd";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MenuBar = () => {
  const pathName = usePathname();
  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    const user = getUserInfo();
    setUserRole(user?.role);
  }, []);

  const items = menuItems(userRole as TUserRole);

  const selectedKeys = items
    ?.map((item) => item.key)
    ?.filter((key) => pathName.includes(key.toLowerCase().replace(" ", "-")));
  return (
    <Menu
      theme="light"
      mode="inline"
      selectedKeys={selectedKeys}
      items={items}
    />
  );
};

export default MenuBar;
