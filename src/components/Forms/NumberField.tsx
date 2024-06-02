"use client";

import { Form, InputNumber } from "antd";

import { Controller } from "react-hook-form";

type TProps = {
  label: string;
  name: string;
};
const NumberField = ({ label, name }: TProps) => {
  return (
    <>
      {label && <label htmlFor={name}>{label} :</label>}
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => {
          return (
            <Form.Item>
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                {...field}
                size="large"
              />
              {error && <small style={{ color: "red" }}>{error.message}</small>}
            </Form.Item>
          );
        }}
      />
    </>
  );
};

export default NumberField;
