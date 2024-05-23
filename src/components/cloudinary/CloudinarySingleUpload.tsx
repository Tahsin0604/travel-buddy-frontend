import { CldUploadWidget } from "next-cloudinary";
import { Dispatch } from "react";

type TCloudinaryProps = {
  setResource: Dispatch<any>;
};
const CloudinarySingleUpload = ({ setResource }: TCloudinaryProps) => {
  return (
    <CldUploadWidget
      options={{
        sources: ["local", "url", "unsplash"],
        multiple: false,
      }}
      signatureEndpoint="/api/uploadToCloudinary"
      onSuccess={(result, { widget }) => {
        setResource(result?.info);
        widget.close();
      }}
    >
      {({ open }) => {
        function handleOnClick() {
          setResource(undefined);
          open();
        }
        return <button onClick={handleOnClick}>Upload an Image</button>;
      }}
    </CldUploadWidget>
  );
};

export default CloudinarySingleUpload;
