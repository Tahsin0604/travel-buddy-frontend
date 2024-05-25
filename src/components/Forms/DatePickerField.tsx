import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

type TDatePickerProps = {
  name: string;
  label?: string;
  disabledDate?: string;
};

const DatePickerField = ({ name, label, disabledDate }: TDatePickerProps) => {
  const dateFormat = "YYYY-MM-DD";

  const disabledDateFunction = (current: dayjs.Dayjs) => {
    if (!disabledDate) return false;
    return current.isBefore(dayjs(disabledDate, dateFormat), "day");
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      {label && <label htmlFor={name}>{label} :</label>}
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item>
            <DatePicker
              {...field}
              format={dateFormat}
              value={field.value ? dayjs(field.value, dateFormat) : null}
              disabledDate={disabledDateFunction}
              size="large"
              style={{ width: "100%" }}
              onChange={(date) => {
                field.onChange(date ? date.format(dateFormat) : null);
              }}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default DatePickerField;
