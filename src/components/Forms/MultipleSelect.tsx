"use client";

import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  disabled?: boolean;
  mode?: "multiple" | undefined;
};
const MultipleSelect = ({
  label,
  name,
  disabled,
  mode,
  options,
}: TSelectProps) => {
  return (
    <>
      {label && <label htmlFor={name}>{label} :</label>}
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => {
          return (
            <Form.Item>
              <Select
                mode={mode}
                style={{ width: "100%" }}
                {...field}
                options={options}
                defaultValue={field.value}
                size="large"
                disabled={disabled}
                placeholder="Select One"
              />
              {error && <small style={{ color: "red" }}>{error.message}</small>}
            </Form.Item>
          );
        }}
      />
    </>
  );
};

export default MultipleSelect;
