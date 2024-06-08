import { Select } from "antd";
import { useEffect, useState } from "react";

type TProps = {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  setValue: React.Dispatch<React.SetStateAction<{}>>;
};
const MultipleChoice = ({ label, value, setValue, options }: TProps) => {
  const [data, setData] = useState("");
  useEffect(() => {
    setData(value);
  }, [value]);
  const handleChange = (value: string) => {
    setValue(value);
  };
  return (
    <div>
      <p className="text-slate-500 mb-1">{label}</p>
      <Select
        style={{ width: "100%" }}
        options={options}
        defaultValue="Select One"
        value={data}
        size="large"
        placeholder="Select One"
        onChange={handleChange}
      />
    </div>
  );
};

export default MultipleChoice;
