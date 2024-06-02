"use client";

import { Form } from "antd";
import { Controller } from "react-hook-form";
import TextArea from "antd/es/input/TextArea";

type TProps = {
  label: string;
  name: string;
};
const TextField = ({ label, name }: TProps) => {
  return (
    <>
      {label && <label htmlFor={name}>{label} :</label>}
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => {
          return (
            <Form.Item>
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
    </>
  );
};

export default TextField;
