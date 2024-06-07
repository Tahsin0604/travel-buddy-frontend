"use client";
import DatePickerField from "@/components/Forms/DatePickerField";
import InputField from "@/components/Forms/InputField";
import MultipleSelect from "@/components/Forms/MultipleSelect";
import ReusableForm from "@/components/Forms/ReusableForm";
import { TripTypeConstant } from "@/constants/trips";
import { Button, Col, Row } from "antd";
import { FieldValues } from "react-hook-form";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

const SearchBox = () => {
  const router = useRouter();
  const dateFormat = "YYYY-MM-DD";
  const date = dayjs(new Date()).format(dateFormat);
  const handleSubmit = (data: FieldValues) => {
    let searchString = "";
    for (const field in data) {
      if (data[field]) {
        
        searchString += `${field}=${data[field]}&`;
      }
    }
    searchString = searchString.slice(0, -1);

    router.push(`/trips?${searchString}`);
  };
  return (
    <div className="custom-container relative -top-32 md:-top-20">
      <div className="py-12 px-6  bg-white  rounded-3xl  drop-shadow">
        <ReusableForm onSubmit={handleSubmit}>
          <Row gutter={[8, 8]} justify="space-around" align="middle">
            <Col xs={24} md={5}>
              <InputField name="destination" label="Destination" />
            </Col>
            <Col xs={24} md={5}>
              <DatePickerField
                name="startDate"
                label="Start dates"
                disabledDate={date}
              />
            </Col>
            <Col xs={24} md={5}>
              <DatePickerField
                name="endDate"
                label="End dates"
                disabledDate={date}
              />
            </Col>
            <Col xs={24} md={5}>
              <MultipleSelect
                options={TripTypeConstant}
                name="tripType"
                label="Travel Type"
              />
            </Col>
            <Col xs={24} md={4}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{
                  width: "100%",
                  marginBottom: "4px",
                }}
              >
                Search
              </Button>
            </Col>
          </Row>
        </ReusableForm>
      </div>
    </div>
  );
};

export default SearchBox;
