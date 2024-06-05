"use client";
import DatePickerField from "@/components/Forms/DatePickerField";
import InputField from "@/components/Forms/InputField";
import ReusableForm from "@/components/Forms/ReusableForm";
import TextField from "@/components/Forms/TextField";
import DrawerContainer from "@/components/Reusable/DrawerContainer/DrawerContainer";
import { authKey } from "@/constants/authKey";
import { useUpdateMYProfileMutation } from "@/redux/api/profile";
import deleteCookies from "@/services/actions/deleteCookies";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  profileData: Record<string, any>;
};
const updateProfile = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  profile: z
    .object({
      dateOfBirth: z.string().optional(),
      bio: z.string().optional(),
    })
    .optional(),
});
const UpdateProfile = ({ open, setOpen, profileData }: TProps) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [updateMYProfile, { isLoading: updateLoading }] =
    useUpdateMYProfileMutation();
  const handleSubmit = async (data: FieldValues) => {
    try {
      const res: Record<string, any> = await updateMYProfile(data);

      if (res?.data?.id) {
        setOpen(false);
        setError("");
        toast.success("Profile updated successfully!!");
        if (res?.data?.email) {
          localStorage.removeItem(authKey);
          await deleteCookies([authKey, "refreshToken"]);
          toast.warning("Log in now!", {
            description: "you just changed email or user name",
          });
          router.push("/login");
        }
      } else {
        setError(res?.error?.message);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  return (
    <DrawerContainer open={open} setOpen={setOpen} title="Update Profile">
      {error && (
        <div>
          <p className="bg-red-500 py-2 text-white text-center rounded mt-1">
            {error}
          </p>
        </div>
      )}
      <ReusableForm
        onSubmit={handleSubmit}
        resolver={zodResolver(updateProfile)}
        defaultValues={profileData}
      >
        <div className="flex flex-col justify-between">
          <InputField name="name" label="Name" />
          <InputField name="email" label="Email" />
          <DatePickerField name="profile.dateOfBirth" label="Date of Birth" />
          <TextField name="profile.bio" label="Bio" />
          <div>
            <Button htmlType="submit" disabled={updateLoading}>
              Update Profile
            </Button>
          </div>
        </div>
      </ReusableForm>
    </DrawerContainer>
  );
};

export default UpdateProfile;
