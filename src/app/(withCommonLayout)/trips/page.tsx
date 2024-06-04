"use client";
import { useGetAllTripsQuery } from "@/redux/api/tripsApi";
import { useEffect, useState } from "react";
import SearchField from "./components/SearchField";
import { TripTypeConstant } from "@/constants/trips";
import MultipleChoice from "./components/MultipleChoice";
import DateChoice from "./components/DateChoice";
import { useDebounced } from "@/redux/hook";
import dayjs from "dayjs";
import TripCard from "@/components/UI/TripCard/TripCard";
import { Divider } from "antd";

const TripsPage = ({
  searchParams,
}: {
  searchParams: Record<string, unknown>;
}) => {
  const dateFormat = "YYYY-MM-DD";
  const date = dayjs(new Date()).format(dateFormat);
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
    if (!!debouncedTerms) {
      query["searchTerm"] = destination;
    }
    if (startDate) {
      query["startDate"] = startDate;
    }
    if (endDate) {
      query["endDate"] = endDate;
    }
    if (tripType) {
      query["tripType"] = tripType;
    }
    if (page) {
      query["page"] = page;
    }
    setSearchQuery(query);
  }, [startDate, endDate, tripType, page, debouncedTerms]);

  const { data, isLoading } = useGetAllTripsQuery({ ...searchQuery });
  const trips = data?.trips as Record<string, any>[];
  const meta = data?.meta;

  return (
    <div className="custom-container">
      <p className="text-6xl font-extrabold mb-4 text-center">Find Trips</p>
      <p className="text-xl font-bold  text-center mb-20">
        Discover your next big adventure
      </p>
      <Divider />
      <div className="flex gap-4  py-20">
        <div className="w-64 space-y-5 hidden lg:block">
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
        </div>

        <div className="w-full grid grid-cols-12 gap-4">
          {trips.map((trip: Record<string, any>) => (
            <div
              key={trip?.id}
              className="col-span-12 md:col-span-6 lg:col-span-3 "
            >
              <TripCard trip={trip} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripsPage;
