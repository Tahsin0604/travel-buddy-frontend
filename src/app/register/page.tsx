"use client";

import assets from "@/assets";
import DatePickerField from "@/components/Forms/DatePickerField";
import InputField from "@/components/Forms/InputField";
import PasswordField from "@/components/Forms/PasswordField";
import ReusableForm from "@/components/Forms/ReusableForm";
import registerUser from "@/services/actions/registerUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { storeUserInfo } from "@/services/auth.services";
import { userLogin } from "@/services/actions/userLogin";
import { useRouter } from "next/navigation";

const createUser = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Must be 6 or more characters long" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Must be 6 or more characters long" }),
    profile: z.object({
      dateOfBirth: z.string(),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const RegisterPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (data: FieldValues) => {
    const { confirmPassword, ...payload } = data;

    try {
      const res = await registerUser(payload);

      if (res?.data?.id) {
        const loggedInData = {
          email: data.email,
          password: data.password,
        };
        const loginRes = await userLogin(loggedInData);

        if (loginRes?.data?.accessToken) {
          setError("");
          toast.success(loginRes?.message);
          await storeUserInfo(loginRes?.data?.accessToken);

          if (loginRes.data?.needPasswordChange) {
            router.push("/dashboard/change-password");
          }
          if (!loginRes.data?.needPasswordChange) {
            router.push("/dashboard/profile");
          }
        }
      } else {
        setError(res?.message);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <div className="bg-slate-50 py-10 min-h-screen">
      <div className="text-center flex justify-center mb-8">
        <Link href="/">
          <p className="text-slate-700 font-bold text-3xl drop-shadow-md tracking-wide">
            <span className="text-sky-400 text-4xl italic">T</span>rip
            <span className="text-sky-400 text-4xl italic">B</span>uddy
          </p>
        </Link>
      </div>

      <div className="grid grid-cols-12 justify-center items-center bg-slate-50 gap-8 lg:gap-16 px-8 md:px-16 lg:px-28">
        <div className="col-span-6 h-full overflow-hidden drop-shadow-md rounded-lg hidden md:block">
          <Image
            src={assets.images.register}
            alt="register"
            className="h-full w-full object-cover"
            quality={100}
          />
        </div>
        <div className="col-span-12 md:col-span-6 px-10 py-6 rounded-lg bg-white drop-shadow-md">
          <h1 className="mb-6 text-3xl text-center font-bold text-slate-800">
            Register Now !!
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
            resolver={zodResolver(createUser)}
          >
            <InputField name="name" label="Name" />
            <InputField name="email" label="Email" />
            <PasswordField name="password" label="Password" />
            <PasswordField name="confirmPassword" label="Confirm Password" />
            <DatePickerField name="profile.dateOfBirth" label="Date of Birth" />
            <Button size="large" className="w-full" htmlType="submit">
              Register
            </Button>
            <p className="mt-2">
              <small>
                All ready have an account?{" "}
                <Link href="/login" className="text-sky-500 ">
                  Login now
                </Link>
              </small>
            </p>
          </ReusableForm>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
