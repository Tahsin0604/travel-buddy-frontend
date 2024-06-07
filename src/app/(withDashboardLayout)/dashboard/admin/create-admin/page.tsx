"use client";
import DatePickerField from "@/components/Forms/DatePickerField";
import InputField from "@/components/Forms/InputField";
import PasswordField from "@/components/Forms/PasswordField";
import ReusableForm from "@/components/Forms/ReusableForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import registerAdmin from "@/services/actions/registerAdmin";

const createAdmin = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6, { message: "Must be 6 or more characters long" }),
  profile: z.object({
    dateOfBirth: z.string(),
  }),
});

const CreateAdminPage = () => {
  const [error, setError] = useState("");

  const handleSubmit = async (payload: FieldValues) => {
    try {
      const res = await registerAdmin(payload);

      if (res?.data?.id) {
        setError("");
        toast.success(res?.message);
      } else {
        setError(res?.message);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <div className="flex justify-center   px-8 md:px-16 lg:px-28">
      <div className="w-full md:w-3/4 lg:w-1/2 px-10 py-6 rounded-lg bg-white drop-shadow-md">
        <h1 className="mb-6 text-3xl text-center font-bold text-slate-800">
          Create new Admin !!
        </h1>
        {error && (
          <div>
            <p className="bg-red-500 py-2 text-white text-center rounded mt-1">
              {error}
            </p>
          </div>
        )}
        <ReusableForm
          onSubmit={handleSubmit}
          resolver={zodResolver(createAdmin)}
        >
          <InputField name="name" label="Name" />
          <InputField name="email" label="Email" />
          <PasswordField name="password" label="Password" />
          <DatePickerField name="profile.dateOfBirth" label="Date of Birth" />
          <Button size="large" className="w-full" htmlType="submit">
            Register
          </Button>
        </ReusableForm>
      </div>
    </div>
  );
};

export default CreateAdminPage;
