const TripsPage = ({
  searchParams,
}: {
  searchParams: Record<string, unknown>;
}) => {
  console.log(searchParams.destination);
  console.log("hellow");
  return <div>Trips</div>;
};

export default TripsPage;
