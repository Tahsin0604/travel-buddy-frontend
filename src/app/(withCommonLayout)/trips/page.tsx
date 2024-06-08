/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useGetAllTripsQuery } from "@/redux/api/tripsApi";
import { ReactNode, useEffect, useState } from "react";
import SearchField from "./components/SearchField";
import { TripTypeConstant } from "@/constants/trips";
import MultipleChoice from "./components/MultipleChoice";
import DateChoice from "./components/DateChoice";
import { useDebounced } from "@/redux/hook";
import dayjs from "dayjs";
import TripCard from "@/components/UI/TripCard/TripCard";
import { Button, Divider } from "antd";
import TripsDrawer from "./components/TripsDrawer";
import PaginationComponent from "@/components/Reusable/PaginationComponent/PaginationComponent";
import TripCardSkeleton from "@/components/UI/TripCard/TripCardSkeleton";

const TripsPage = ({
  searchParams,
}: {
  searchParams: Record<string, unknown>;
}) => {
  const dateFormat = "YYYY-MM-DD";
  const date = dayjs(new Date()).format(dateFormat);
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(searchParams?.startDate || date);
  const [endDate, setEndDate] = useState(searchParams?.endDate || "");
  const [tripType, setTripType] = useState(searchParams?.tripType || "");
  const [page, setPage] = useState(1);
  const [destination, setDestination] = useState(
    searchParams?.destination || ""
  );
  const debouncedTerms = useDebounced({
    searchQuery: destination as string,
    delay: 2000,
  });

  const [searchQuery, setSearchQuery] = useState<Record<string, any>>({
    page: 1,
    limit: 12,
    startDate: startDate,
  });

  useEffect(() => {
    const query = { ...searchQuery };
    if (debouncedTerms) {
      console.log(debouncedTerms);
      query["searchTerm"] = debouncedTerms;
    }
    if (startDate) {
      query["startDate"] = startDate;
    }
    if (endDate) {
      query["endDate"] = endDate;
    }
    if (endDate === "") {
      delete query["endDate"];
    }
    if (tripType) {
      query["tripType"] = tripType;
    }
    if (tripType === "") {
      delete query["tripType"];
    }
    if (page) {
      query["page"] = page;
    }
    setSearchQuery(query);
  }, [startDate, endDate, tripType, page, debouncedTerms]);

  const { data, isLoading } = useGetAllTripsQuery({ ...searchQuery });
  const trips = data?.trips as Record<string, any>[];
  const meta = data?.meta as Record<string, any>;
  const handleReset = () => {
    setPage(1);
    setStartDate(date);
    setDestination("");
    setEndDate("");
    setTripType("");
  };
  let renderComponent: ReactNode;
  if (isLoading) {
    renderComponent = (
      <>
        {Array.from({ length: 12 }, (v, i) => i).map((item) => (
          <div key={item} className="col-span-12 md:col-span-6 lg:col-span-4 ">
            <TripCardSkeleton />
          </div>
        ))}
      </>
    );
  } else {
    renderComponent = (
      <>
        {trips?.map((trip: Record<string, any>) => (
          <div
            key={trip?.id}
            className="col-span-12 md:col-span-6 lg:col-span-4 "
          >
            <TripCard trip={trip} />
          </div>
        ))}
      </>
    );
  }
  return (
    <div className="custom-container mb-4">
      <TripsDrawer
        open={open}
        setOpen={setOpen}
        date={date}
        destination={destination as string}
        endDate={endDate as string}
        startDate={startDate as string}
        tripType={tripType as string}
        setDestination={setDestination}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setTripType={setTripType}
        setPage={setPage}
      />
      <p className="text-6xl font-extrabold mt-10 mb-4 text-center">
        Find Trips
      </p>
      <p className="text-xl font-bold  text-center  mb-8">
        Discover your next big adventure
      </p>
      <Divider />
      <div className="flex gap-6  py-6">
        <div className="w-1/5 space-y-5 hidden lg:block">
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
          <Button
            danger
            onClick={() => handleReset()}
            style={{ width: "100%" }}
          >
            Reset Filter
          </Button>
        </div>
        <div className="w-full lg:w-4/5 space-y-5">
          <div className=" flex justify-between items-centers">
            {trips && (
              <p className="text-slate-700 font-bold text-xl">
                <span className="text-sky-500">{meta?.total}</span> trips found
              </p>
            )}
            <div className="lg:hidden">
              <Button
                onClick={() => {
                  setOpen(true);
                }}
              >
                Filter
              </Button>
            </div>
          </div>
          <div className=" grid grid-cols-12 gap-4">{renderComponent}</div>
          <div className="flex justify-center item-center pt-6">
            {trips?.length > 0 && (
              <PaginationComponent
                total={meta?.total}
                current={meta?.page}
                limit={meta?.limit}
                setPage={setPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripsPage;
