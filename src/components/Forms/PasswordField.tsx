"use client";

import { Form, Input } from "antd";

import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import { Controller } from "react-hook-form";

type TProps = {
  label: string;
  name: string;
};
const PasswordField = ({ label, name }: TProps) => {
  return (
    <>
      {label && <label htmlFor={name}>{label} :</label>}
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => {
          return (
            <Form.Item>
              <Input.Password
                type=""
                style={{ width: "100%" }}
                {...field}
                defaultValue={field.value}
                size="large"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
              {error && <small style={{ color: "red" }}>{error.message}</small>}
            </Form.Item>
          );
        }}
      />
    </>
  );
};

export default PasswordField;
