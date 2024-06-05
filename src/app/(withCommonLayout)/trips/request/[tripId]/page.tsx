import { useGetMYProfileQuery } from "@/redux/api/profile";

const TripRequestPage = ({
  params: { tripId },
}: {
  params: { tripId: string };
}) => {
  const { data } = useGetMYProfileQuery({});
  return <div>{tripId}</div>;
};

export default TripRequestPage;
