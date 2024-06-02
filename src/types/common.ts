import { USER_ROLE } from "@/constants/role";
import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";
import { ForwardRefExoticComponent, RefAttributes } from "react";
export type TUserRole = keyof typeof USER_ROLE;

export type TMeta = {
  page: number;
  limit: number;
  total: number;
};

export type TMenuItems = {
  key: string;
  path: string;
  icon: ForwardRefExoticComponent<
    Omit<AntdIconProps, "ref"> & RefAttributes<HTMLSpanElement>
  >;
};

export type TResponseSuccess = {
  data: any;
  meta?: TMeta;
};
export type TGenericErrorResponseMessage = {
  path: string | number;
  message: string;
};
export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: TGenericErrorResponseMessage[];
};

export type TModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
