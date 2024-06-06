/* eslint-disable react-hooks/exhaustive-deps */
import { Button, InputNumber } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState, useEffect } from "react";

type TProps = {
  index: number;
  removeItem: (index: number) => void;
  itinerary: {
    startDay: number;
    endDay: number;
    nights: number;
    activities: string;
  }[];
  setItinerary: React.Dispatch<
    React.SetStateAction<
      {
        startDay: number;
        endDay: number;
        nights: number;
        activities: string;
      }[]
    >
  >;
  updateInitial?: boolean;
};

const ItineraryItem = ({
  index,
  removeItem,
  itinerary,
  setItinerary,
  updateInitial = false,
}: TProps) => {
  const [nights, setNights] = useState<number>(itinerary[index]?.nights);
  const [activities, setActivities] = useState<string>(
    itinerary[index]?.activities
  );
  const startDay = itinerary[index]?.startDay;
  // useEffect(() => {
  //   setNights(itinerary[index]?.nights);
  //   setActivities(itinerary[index]?.activities);
  // }, [itinerary]);

  useEffect(() => {
    if (updateInitial) {
      const newItinerary = [...itinerary];

      newItinerary[index] = {
        startDay: startDay,
        endDay: startDay + nights,
        nights,
        activities,
      };

      const tempItinerary = newItinerary.map((item, i) => {
        console.log(item, i);
        if (i > index && item) {
          const prevItem = newItinerary[i - 1];
          console.log(i, index, item);
          item.startDay = prevItem.endDay;
          item.endDay = item.startDay + item.nights;
        }

        return item;
      });

      setItinerary(tempItinerary);
    }
  }, [nights, activities]);

  const endDay = nights > 0 ? startDay + nights : startDay;

  return (
    <div className="flex flex-col gap-2 mb-5">
      <div className="flex flex-row justify-between items-center">
        <p className="text-sky-300 font-semibold ">{`Day ${startDay} ${
          nights > 0 ? `- Day ${endDay}` : ""
        }`}</p>
        <div>
          <p className="text-center">Nights</p>
          <div className="flex items-center  gap-4">
            <Button size="large" onClick={() => setNights(nights - 1)}>
              -
            </Button>
            <InputNumber
              min={0}
              value={itinerary[index]?.nights}
              size="large"
              disabled={true}
            />
            <Button size="large" onClick={() => setNights(nights + 1)}>
              +
            </Button>
          </div>
        </div>
      </div>

      <TextArea
        value={itinerary[index]?.activities}
        placeholder="write activities"
        required
        onChange={(e) => setActivities(e.target.value)}
      />
      {itinerary.length > 1 && (
        <div className="flex justify-end">
          <Button type="primary" danger onClick={() => removeItem(index)}>
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

export default ItineraryItem;
