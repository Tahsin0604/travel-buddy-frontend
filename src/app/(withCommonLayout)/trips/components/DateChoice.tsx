import { DatePicker, Form } from "antd";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

type TProps = {
  label: string;
  value: string;
  setDate: React.Dispatch<React.SetStateAction<{}>>;
};

const DateChoice = ({ label, value, setDate }: TProps) => {
  const dateFormat = "YYYY-MM-DD";
  const date = dayjs(new Date()).format(dateFormat);

  const disabledDateFunction = (current: dayjs.Dayjs) => {
    return current.isBefore(dayjs(date, dateFormat), "day");
  };

  return (
    <div>
      <p>{label}</p>
      <DatePicker
        format={dateFormat}
        defaultValue={value ? dayjs(value) : null}
        disabledDate={disabledDateFunction}
        size="large"
        style={{ width: "100%" }}
        onChange={(date) => {
          const dateValue = date ? date.format(dateFormat) : "";
          setDate(dateValue);
        }}
      />
    </div>
  );
};

export default DateChoice;
