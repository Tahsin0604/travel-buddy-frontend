"use client";

import CloudinarySingleUpload from "@/components/cloudinary/CloudinarySingleUpload";
import deleteImage from "@/services/deleteImage";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [resource, setResource] = useState<any>();

  return (
    <div>
      <CloudinarySingleUpload setResource={setResource} />
      {resource && (
        <div>
          <h2>Uploaded Image</h2>
          <Image
            src={resource.secure_url}
            alt="Uploaded"
            width={100}
            height={100}
          />
        </div>
      )}
    </div>
  );
}
