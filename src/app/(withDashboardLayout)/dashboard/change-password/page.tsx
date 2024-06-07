"use client";
import PasswordField from "@/components/Forms/PasswordField";
import ReusableForm from "@/components/Forms/ReusableForm";
import { useChangePasswordMutation } from "@/redux/api/authApi";
import { logoutUser } from "@/services/actions/logoutUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const changePasswordValidation = z
  .object({
    oldPassword: z
      .string()
      .min(6, { message: "Must be 6 or more characters long" }),
    newPassword: z
      .string()
      .min(6, { message: "Must be 6 or more characters long" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Must be 6 or more characters long" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const ChangePasswordPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const handleSubmit = async (values: FieldValues) => {
    const { confirmPassword, ...payload } = values;

    try {
      const res: Record<string, any> = await changePassword(payload);

      if (res.data.status === 200) {
        setError("");
        await logoutUser(router);
        router.push("/login");
        toast.success("Password changed successfully");
      } else {
        setError(res?.error?.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full px-6 md:px-20 lg:px-48 py-6 rounded-lg bg-white">
      <h1 className="mb-6 text-3xl text-center font-bold text-slate-800">
        Change Password !!
      </h1>

      {error && (
        <div>
          <p className="bg-red-500 py-3 text-white text-center rounded mt-1">
            {error}
          </p>
        </div>
      )}

      <ReusableForm
        onSubmit={handleSubmit}
        resolver={zodResolver(changePasswordValidation)}
      >
        <PasswordField label="Old Password" name="oldPassword" />
        <PasswordField label="New Password" name="newPassword" />
        <PasswordField label="Confirm Password" name="confirmPassword" />

        <Button
          size="large"
          className="w-full"
          htmlType="submit"
          disabled={isLoading}
        >
          Change Password
        </Button>
      </ReusableForm>
    </div>
  );
};

export default ChangePasswordPage;
