"use client";

import { Form } from "antd";
// import TextArea from "antd/es/input/TextArea";

import { Controller } from "react-hook-form";
import TiptapEditor from "./TiptapEditor";

type TProps = {
  label: string;
  name: string;
};
const EditorField = ({ label, name }: TProps) => {
  return (
    <>
      {label && <label htmlFor={name}>{label} :</label>}
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => {
          return (
            <Form.Item>
              <TiptapEditor
                description={field.value}
                onChange={field.onChange}
              />
              {error && <small style={{ color: "red" }}>{error.message}</small>}
            </Form.Item>
          );
        }}
      />
    </>
  );
};

export default EditorField;
