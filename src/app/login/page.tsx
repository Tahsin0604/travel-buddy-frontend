"use client";

import assets from "@/assets";
import InputField from "@/components/Forms/InputField";
import PasswordField from "@/components/Forms/PasswordField";
import ReusableForm from "@/components/Forms/ReusableForm";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const loginUser = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "Must be 6 or more characters long" }),
});

const LoginPage = ({
  searchParams,
}: {
  searchParams: Record<string, unknown>;
}) => {
  const router = useRouter();
  console.log(searchParams);
  const redirect = searchParams?.redirect as string;
  console.log(redirect);
  const [error, setError] = useState("");
  const registerRoute = () => {
    const redirectUrl = redirect || "";
    if (redirectUrl === "") {
      router.push(`/register`);
    } else {
      router.push(`/register?redirect=${redirectUrl}`);
    }
  };

  const handleSubmit = async (data: FieldValues) => {
    try {
      const loginRes = await userLogin(data);

      if (loginRes?.data?.accessToken) {
        setError("");
        toast.success(loginRes?.message);
        await storeUserInfo(loginRes?.data?.accessToken);
        console.log(searchParams);
        const redirectUrl = redirect || "/dashboard/profile";
        if (loginRes.data?.needPasswordChange) {
          router.push("/dashboard/change-password");
        }
        if (!loginRes.data?.needPasswordChange) {
          router.push(redirectUrl);
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

        <div className="grid grid-cols-12 justify-center items-center gap-8 lg:gap-16 px-8 md:px-16 lg:px-28">
          <div className="col-span-6  h-full overflow-hidden drop-shadow-md rounded-lg hidden md:block relative">
            <Image
              src={assets.images.login}
              alt="login"
              sizes="100vw"
              quality={100}
              fill
              className="object-cover"
            />
          </div>
          <div className="col-span-12 md:col-span-6 px-10 py-6 rounded-lg bg-white drop-shadow-md">
            <h1 className="mb-6 text-3xl text-center font-bold text-slate-800">
              Login Now !!
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
                  <Button
                    type="link"
                    className="text-sky-500"
                    onClick={() => registerRoute()}
                  >
                    Create an account
                  </Button>
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
