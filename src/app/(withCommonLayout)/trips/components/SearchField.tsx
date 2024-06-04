import { Input } from "antd";

type TProps = {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<{}>>;
};
const SearchField = ({ label, value, setValue }: TProps) => {
  return (
    <div>
      <p className="text-slate-500 mb-1">{label}</p>
      <Input.Search
        style={{ width: "100%" }}
        size="large"
        placeholder="Search Destination"
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default SearchField;
