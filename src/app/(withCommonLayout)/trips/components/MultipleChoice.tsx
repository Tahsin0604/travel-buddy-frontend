import { Select } from "antd";

type TProps = {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  setValue: React.Dispatch<React.SetStateAction<{}>>;
};
const MultipleChoice = ({ label, value, setValue, options }: TProps) => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <div>
      <p>{label}</p>
      <Select
        style={{ width: "100%" }}
        options={options}
        defaultValue={value ? value : "Select One"}
        size="large"
        placeholder="Select One"
        onChange={handleChange}
      />
    </div>
  );
};

export default MultipleChoice;
