// components/CloudinaryUpload.js
import { Button } from "antd";
import { CldUploadWidget } from "next-cloudinary";
import { Dispatch } from "react";
import { CloudUploadOutlined } from "@ant-design/icons";

type TCloudinaryProps = {
  setResource: Dispatch<any>;
};

const CloudinaryUpload = ({ setResource }: TCloudinaryProps) => {
  return (
    <CldUploadWidget
      options={{
        sources: ["local", "url", "unsplash"],
        multiple: false,
      }}
      signatureEndpoint="/api/uploadToCloudinary"
      onSuccess={(result) => {
        setResource(result?.info);
      }}
    >
      {({ open }) => {
        function handleOnClick() {
          open();
        }
        return (
          <Button
            size="large"
            onClick={handleOnClick}
            icon={<CloudUploadOutlined />}
          >
            Add Image
          </Button>
        );
      }}
    </CldUploadWidget>
  );
};

export default CloudinaryUpload;
