"use client";
import React, { useEffect, useState } from "react";
import DatePickerField from "@/components/Forms/DatePickerField";
import EditorField from "@/components/Forms/EditorField";
import InputField from "@/components/Forms/InputField";
import MultipleSelect from "@/components/Forms/MultipleSelect";
import NumberField from "@/components/Forms/NumberField";
import ReusableForm from "@/components/Forms/ReusableForm";
import TextField from "@/components/Forms/TextField";
import { TripTypeConstant } from "@/constants/trips";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import { FieldValues } from "react-hook-form";
import { z } from "zod";
import dayjs from "dayjs";
import CustomSlider from "@/components/UI/CustomSlider/CustomSlider";
import ImageUploadModal from "@/components/Forms/ImageUploadModal";
import { toast } from "sonner";
import {
  useGetTripDetailsQuery,
  useUpdateTripMutation,
} from "@/redux/api/tripsApi";
import { useRouter } from "next/navigation";
import ItineraryItem from "@/components/Reusable/ItineraryItem/ItineraryItem";
import Loading from "@/components/UI/Loading";

const updateTripValidation = z.object({
  destination: z.string(),
  tripType: z.enum([...TripTypeConstant.map((trip) => trip.value)] as [
    string,
    ...string[]
  ]),
  tripTitle: z.string(),
  description: z.string().optional(),
  startDate: z.string(),
  budget: z.number(),
});

const UpdateTripsPage = ({
  params: { tripId },
}: {
  params: { tripId: string };
}) => {
  const { data: trip, isLoading: tripDetailsLoading } =
    useGetTripDetailsQuery(tripId);

  const [updateTrip, { isLoading: createLoading }] = useUpdateTripMutation();

  const [images, setImages] = useState<string[]>([]);
  const [updateItinerary, setUpdateItinerary] = useState<boolean>(false);
  const [itinerary, setItinerary] = useState<
    { startDay: number; endDay: number; nights: number; activities: string }[]
  >([{ startDay: 1, endDay: 1, nights: 0, activities: "" }]);

  useEffect(() => {
    if (trip) {
      console.log("Trip data:", trip);
      setImages([...trip.images]);
      const temp = [...trip.itinerary];
      console.log(temp);
      setItinerary([...temp]);
    }
  }, [trip]);
  console.log(itinerary);
  const [error, setError] = useState("");
  const router = useRouter();
  const dateFormat = "YYYY-MM-DD";
  const date = dayjs(new Date()).format(dateFormat);
  const defaultValue = {
    destination: trip?.destination,
    tripType: trip?.tripType,
    tripTitle: trip?.tripTitle,
    description: trip?.description,
    startDate: trip?.startDate,
    budget: trip?.budget,
  };

  const addItineraryItem = () => {
    setUpdateItinerary(true);
    const lastItinerary = itinerary[itinerary.length - 1];
    const startDay = lastItinerary.endDay;
    setItinerary([
      ...itinerary,
      { startDay: startDay, endDay: startDay, nights: 0, activities: "" },
    ]);
  };

  const removeItineraryItem = (index: number) => {
    setUpdateItinerary(true);
    const newItinerary = itinerary.filter((_, i) => i !== index);

    const tempItinerary = newItinerary.map((item, i) => {
      if (index === itinerary.length - 1) {
        return item;
      } else {
        if (index === 0 && i === 0) {
          item.startDay = 1;
        }
        if (index !== 0 && i === 0) {
          item.startDay = item.startDay;
        }
        if (i !== 0) {
          const prevItem = newItinerary[i - 1];
          item.startDay = prevItem.endDay;
        }

        item.endDay = item.startDay + item.nights;

        return item;
      }
    });

    setItinerary(tempItinerary);
  };

  const handleSubmit = async (values: FieldValues) => {
    if (images.length === 0) {
      toast.error("Please upload at least one image");
    } else {
      const endDate = itinerary[itinerary.length - 1].endDay - 1;

      values.images = images;
      values.endDate = dayjs(values.startDate)
        .add(endDate, "day")
        .format("YYYY-MM-DD");

      values.itinerary = itinerary;
      try {
        const res: Record<string, any> = await updateTrip({
          id: tripId,
          data: values,
        });
        console.log(res);
        if (res?.data?.id) {
          setError("");
          toast.success("Trips added successfully");
          router.push(`/trips/${tripId}`);
        } else {
          setError(res?.error?.message);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (tripDetailsLoading) {
    return (
      <div className="flex justify-center mt-36">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full px-6 md:px-20 lg:px-48 py-6 rounded-lg bg-white">
      <h1 className="mb-6 text-3xl text-center font-bold text-slate-800">
        Update Post !!
      </h1>

      {error && (
        <div>
          <p className="bg-red-500 py-3 text-white text-center rounded mt-1">
            {error}
          </p>
        </div>
      )}
      {images.length > 0 && (
        <div className="w-full h-56  lg:h-96">
          <CustomSlider images={images} />
        </div>
      )}

      <div className="my-6">
        <ImageUploadModal images={images} setImages={setImages} />
      </div>

      <ReusableForm
        defaultValues={defaultValue}
        onSubmit={handleSubmit}
        resolver={zodResolver(updateTripValidation)}
      >
        <InputField name="destination" label="Destination" />
        <MultipleSelect
          name="tripType"
          label="Trip Type"
          options={TripTypeConstant}
        />
        <TextField name="tripTitle" label="Title" />
        <EditorField name="description" label="Description" />

        <div className="flex gap-4 items-center w-full">
          <div className="w-1/2">
            <DatePickerField
              name="startDate"
              label="Start Date"
              disabledDate={date}
            />
          </div>
        </div>
        <NumberField name="budget" label="Budget" />

        <div className="mb-4">
          <h3 className="text-xl font-semibold">Itinerary</h3>
          {itinerary.map((_, index) => (
            <ItineraryItem
              key={index}
              index={index}
              itinerary={itinerary}
              setItinerary={setItinerary}
              removeItem={removeItineraryItem}
              updateInitial={updateItinerary}
            />
          ))}
          <Button type="dashed" className="mt-3" onClick={addItineraryItem}>
            Add Itinerary Item
          </Button>
        </div>

        <Button
          size="large"
          className="w-full"
          htmlType="submit"
          disabled={createLoading}
        >
          Update
        </Button>
      </ReusableForm>
    </div>
  );
};

export default UpdateTripsPage;
