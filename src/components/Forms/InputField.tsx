"use client";

import { Form, Input } from "antd";

import { Controller } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
};
const InputField = ({ label, name }: TPHSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <Form.Item label={label}>
            <Input
              style={{ width: "100%" }}
              {...field}
              defaultValue={field.value}
              size="large"
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        );
      }}
    />
  );
};

export default InputField;
