import { Dispatch, ReactNode, SetStateAction } from "react";

import { Button, Drawer } from "antd";
import DrawerContainer from "@/components/Reusable/DrawerContainer/DrawerContainer";
import SearchField from "./SearchField";
import MultipleChoice from "./MultipleChoice";
import DateChoice from "./DateChoice";
import { TripTypeConstant } from "@/constants/trips";

type TProps = {
  date: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  destination: string;
  setDestination: Dispatch<SetStateAction<{}>>;
  startDate: string;
  setStartDate: Dispatch<SetStateAction<{}>>;
  endDate: string;
  setEndDate: Dispatch<SetStateAction<{}>>;
  tripType: string;
  setTripType: Dispatch<SetStateAction<{}>>;
  setPage: Dispatch<SetStateAction<number>>;
};

const TripsDrawer = ({
  open,
  setOpen,
  date,
  destination,
  setDestination,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  tripType,
  setTripType,
  setPage,
}: TProps) => {
  const handleReset = () => {
    setPage(1);
    setStartDate(date);
    setDestination("");
    setEndDate("");
    setTripType("");
    setOpen(false);
  };
  return (
    <>
      <DrawerContainer title="Filter Trips" open={open} setOpen={setOpen}>
        <SearchField
          label="Destination"
          value={destination as string}
          setValue={setDestination}
        />
        <MultipleChoice
          options={TripTypeConstant}
          label="Trip Type"
          value={tripType as string}
          setValue={setTripType}
        />
        <DateChoice
          label="Start Date"
          value={startDate as string}
          setDate={setStartDate}
        />
        <DateChoice
          label="End Date"
          value={endDate as string}
          setDate={setEndDate}
        />
        <Button danger onClick={() => handleReset()}>
          Reset Filter
        </Button>
      </DrawerContainer>
    </>
  );
};

export default TripsDrawer;
