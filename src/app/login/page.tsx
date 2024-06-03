"use client";

import assets from "@/assets";
import DatePickerField from "@/components/Forms/DatePickerField";
import InputField from "@/components/Forms/InputField";
import PasswordField from "@/components/Forms/PasswordField";
import ReusableForm from "@/components/Forms/ReusableForm";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const loginUser = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "Must be 6 or more characters long" }),
});

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (data: FieldValues) => {
    try {
      const loginRes = await userLogin(data);
      console.log(loginRes);
      if (loginRes?.data?.accessToken) {
        setError("");
        toast.success(loginRes?.message);
        await storeUserInfo(loginRes?.data?.accessToken);

        if (loginRes.data?.needPasswordChange) {
          console.log("need password");
          router.push("/dashboard/change-password");
        }
        if (!loginRes.data?.needPasswordChange) {
          console.log("profile");
          router.push("/dashboard/profile");
        }
      } else {
        setError(loginRes?.message);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <div className="bg-slate-50 py-10 min-h-screen flex flex-col justify-center item-center">
      <div>
        <div className="text-center flex justify-center mb-8">
          <Link href="/">
            <p className="text-slate-700 font-bold text-3xl drop-shadow-md tracking-wide">
              <span className="text-sky-400 text-4xl italic">T</span>rip
              <span className="text-sky-400 text-4xl italic">B</span>uddy
            </p>
          </Link>
        </div>
        {error && (
          <div>
            <p className="bg-red-500 py-[1px] px-8 md:px-16 lg:px-28 text-white text-center rounded mt-1">
              {error}
            </p>
          </div>
        )}
        <div className="flex justify-center items-center gap-8 lg:gap-16 px-8 md:px-16 lg:px-28">
          <div className="w-1/2 h-[51vh] overflow-hidden drop-shadow-md rounded-lg hidden md:block">
            <Image
              src={assets.images.login}
              alt="login"
              className="h-full w-full object-cover"
              quality={100}
            />
          </div>
          <div className="w-full md:w-1/2 px-10 py-6 rounded-lg bg-white drop-shadow-md">
            <h1 className="mb-6 text-3xl text-center font-bold text-slate-800">
              Login Now !!
            </h1>
            <ReusableForm
              onSubmit={handleSubmit}
              resolver={zodResolver(loginUser)}
            >
              <InputField name="email" label="Email" />
              <PasswordField name="password" label="Password" />
              <Button size="large" className="w-full" htmlType="submit">
                Login
              </Button>
              <p className="mt-2">
                <small>
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="text-sky-500">
                    Create an account
                  </Link>
                </small>
              </p>
            </ReusableForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
