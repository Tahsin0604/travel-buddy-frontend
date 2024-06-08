import { Drawer } from "antd";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import MenuBar from "../Menu/Menu";

type TProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
const DrawerItems = ({ open, setOpen }: TProps) => {
  const onClose = () => {
    setOpen(false);
  };

  return (
    <Drawer placement="left" onClose={onClose} open={open} key="left">
      <div className="text-center flex justify-center mb-8">
        <Link href="/">
          <p className="text-slate-700 font-bold text-3xl drop-shadow-md tracking-wide">
            <span className="text-sky-400 text-4xl italic">T</span>rip
            <span className="text-sky-400 text-4xl italic">B</span>uddy
          </p>
        </Link>
      </div>
      <MenuBar />
    </Drawer>
  );
};

export default DrawerItems;
