import { USER_ROLE } from "@/constants/role";
import { TMenuItems, TUserRole } from "@/types";
import {
  UserOutlined,
  TeamOutlined,
  KeyOutlined,
  EnvironmentOutlined,
  PlusOutlined,
  UserAddOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import React from "react";

export const menuItems = (userRole: TUserRole) => {
  const role = userRole?.toLowerCase();
  const roleMenus: TMenuItems[] = [];
  if (userRole?.toLowerCase() === USER_ROLE.ADMIN) {
    roleMenus.push(
      {
        key: "Create Admin",
        path: `${role}/create-admin`,
        icon: UserAddOutlined,
      },
      {
        key: "User Management",
        path: `${role}/user-management`,
        icon: TeamOutlined,
      },
      {
        key: "Trips Management",
        path: `${role}/trips-management`,
        icon: EnvironmentOutlined,
      }
    );
  }
  if (userRole?.toLowerCase() === USER_ROLE.USER) {
    roleMenus.push(
      {
        key: "Create Trips",
        path: `${role}/create-trips`,
        icon: PlusOutlined,
      },
      {
        key: "My Trips",
        path: `${role}/my-trips`,
        icon: EnvironmentOutlined,
      },
      {
        key: "My Trip Request",
        path: `${role}/my-trip-request`,
        icon: SnippetsOutlined,
      }
    );
  }

  const menus: TMenuItems[] = [
    {
      key: "Profile",
      path: `profile`,
      icon: UserOutlined,
    },
    ...roleMenus,
    {
      key: "Change Password",
      path: `change-password`,
      icon: KeyOutlined,
    },
  ];
  const sideBarItems = menus.map((menu: TMenuItems) => ({
    key: menu.key,
    icon: React.createElement(menu.icon),
    label: <Link href={`/dashboard/${menu.path}`}>{menu.key}</Link>,
  }));
  return sideBarItems;
};
