"use client";
import InputField from "@/components/Forms/InputField";
import ReusableForm from "@/components/Forms/ReusableForm";
import Loading from "@/components/UI/Loading";
import { useGetMYProfileQuery } from "@/redux/api/profile";
import { useSendBuddyRequestMutation } from "@/redux/api/travelBuddyApi";
import { useGetTripDetailsQuery } from "@/redux/api/tripsApi";
import { getUserInfo } from "@/services/auth.services";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const TripRequestPage = ({
  params: { tripId },
}: {
  params: { tripId: string };
}) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const user = getUserInfo();
  const { data: userData, isLoading: userLoading } = useGetMYProfileQuery({});
  const { data: trip, isLoading: tripDetailsLoading } =
    useGetTripDetailsQuery(tripId);
  const [sendBuddyRequest, { isLoading }] = useSendBuddyRequestMutation();
  useEffect(() => {
    if (userData) {
      if (userData.id === user.id) {
        router.push(`/trips/${tripId}`);
        router.refresh();
      }
    }
  }, [userData]);
  if (tripDetailsLoading || userLoading) {
    return (
      <div className="flex justify-center mt-36">
        <Loading />
      </div>
    );
  }
  const defaultData = {
    tripName: trip?.tripTitle,
    destination: trip?.destination,
    budget: trip?.budget,
    userName: userData?.name,
    useEmail: userData?.email,
    contactNumber: "",
  };

  const handleSubmit = async (data: FieldValues) => {
    const payload = {
      userName: userData?.name,
      useEmail: userData?.email,
      contactNumber: data.contactNumber,
    };

    try {
      const res: Record<string, any> = await sendBuddyRequest({
        tripId: tripId,
        data: payload,
      });
      if (res?.data?.id) {
        setError("");
        toast.success("Request send successfully");
        router.push(`/trips/${tripId}`);
      } else {
        setError(res?.error?.message);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <div className="bg-slate-50 py-10 min-h-screen">
      <div className="flex flex-col justify-center items-center bg-slate-50 gap-8 lg:gap-16 px-8 md:px-16 lg:px-28">
        <div className="w-full md:w-1/2 px-10 py-6 rounded-lg bg-white drop-shadow-md">
          <h1 className="mb-6 text-3xl text-center font-bold text-slate-800">
            Request Now!!
          </h1>
          {error && (
            <div>
              <p className="bg-red-500 py-2 text-white text-center rounded mt-1">
                {error}
              </p>
            </div>
          )}
          <ReusableForm onSubmit={handleSubmit} defaultValues={defaultData}>
            <InputField name="tripName" label="Trip Name" disabled={true} />
            <InputField
              name="destination"
              label="Destination"
              disabled={true}
            />
            <InputField name="budget" label="Budget" disabled={true} />
            <InputField name="userName" label="User Name" disabled={true} />
            <InputField name="useEmail" label="User Email" disabled={true} />
            <InputField name="contactNumber" label="Contact Number" />

            <Button
              size="large"
              className="w-full"
              htmlType="submit"
              disabled={isLoading}
            >
              Request To Join
            </Button>
          </ReusableForm>
        </div>
      </div>
    </div>
  );
};

export default TripRequestPage;
