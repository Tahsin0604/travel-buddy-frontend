const TripRequestPage = ({
  params: { tripId },
}: {
  params: { tripId: string };
}) => {
  return <div>{tripId}</div>;
};

export default TripRequestPage;
