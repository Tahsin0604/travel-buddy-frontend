"use client";

import { Form, Select } from "antd";
import type { SelectProps } from "antd";
import { Controller } from "react-hook-form";

type TPHSelectProps = {
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
}: TPHSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <Form.Item label={label}>
            <Select
              mode={mode}
              style={{ width: "100%" }}
              {...field}
              options={options}
              defaultValue={field.value}
              size="large"
              disabled={disabled}
              labelInValue
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        );
      }}
    />
  );
};

export default MultipleSelect;
