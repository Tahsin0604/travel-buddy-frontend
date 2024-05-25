"use client";

import { Form } from "antd";
import TextArea from "antd/es/input/TextArea";

import { Controller } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
};
const TextField = ({ label, name }: TPHSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <Form.Item label={label}>
            <TextArea
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

export default TextField;
