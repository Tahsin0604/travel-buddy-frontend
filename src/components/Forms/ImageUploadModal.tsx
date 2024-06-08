"use client";
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import CloudinaryUpload from "../Cloudinary/CloudinaryUpload";
import Image from "next/image";
import { DeleteOutlined } from "@ant-design/icons";

const ImageUploadModal = ({
  images,
  setImages,
}: {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resource, setResource] = useState<any>([]);
  const [uploads, setUploads] = useState<string[]>(images);
  useEffect(() => {
    if (resource?.secure_url && !uploads.includes(resource.secure_url)) {
      setUploads((prevUploads) => [...prevUploads, resource.secure_url]);
    }
  }, [resource]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setImages(uploads);
    setIsModalOpen(false);
  };
  const handleDelete = (image: string) => {
    const temporaryUpload = uploads.filter((upload) => upload !== image);
    setUploads(temporaryUpload);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Images
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        {uploads.length < 5 && <CloudinaryUpload setResource={setResource} />}

        {uploads.length > 0 && (
          <div className="flex items-center gap-2 mt-2">
            {uploads?.map((image, index) => (
              <div
                key={index}
                className="h-[80px] w-[80px] relative rounded drop-shadow overflow-hidden"
              >
                <Image
                  src={image}
                  sizes="100vw"
                  placeholder="blur"
                  quality={100}
                  fill
                  className="object-cover"
                  alt={`image ${index + 1}`}
                />
                <div className="absolute text-white font-bold bottom-0 right-0 z-10">
                  <DeleteOutlined
                    onClick={() => handleDelete(image)}
                    className="  bg-red-600 rounded p-2 bg-opacity-85"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </>
  );
};

export default ImageUploadModal;
