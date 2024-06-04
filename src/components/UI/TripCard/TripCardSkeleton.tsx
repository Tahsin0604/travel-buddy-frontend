import { Skeleton } from "antd";

const TripCardSkeleton = () => {
  return (
    <div className="rounded-md shadow overflow-hidden">
      <div style={{ height: "224px", width: "100%" }}>
        <Skeleton.Input
          active
          size="large"
          style={{ height: "224px" }}
          block={true}
        />
      </div>
      <div className="py-4 px-4 block">
        <Skeleton active />
      </div>
    </div>
  );
};

export default TripCardSkeleton;
