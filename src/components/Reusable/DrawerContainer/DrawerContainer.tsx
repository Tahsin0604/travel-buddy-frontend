import { ReactNode, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Drawer, Space } from "antd";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: ReactNode;
};

const DrawerContainer = ({ open, setOpen, title, children }: TProps) => {
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer
        title={title}
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        {children}
      </Drawer>
    </>
  );
};

export default DrawerContainer;
