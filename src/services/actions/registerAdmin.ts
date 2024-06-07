import { authKey } from "@/constants/authKey";
import { getFromLocalStorage } from "@/utils/localStorageUtils";

const registerAdmin = async (data: any) => {
  const accessToken = getFromLocalStorage(authKey);
  if (!accessToken) {
    throw new Error("Access token is missing");
  }
  const res = await fetch(
    `https://travel-buddy-ecru.vercel.app/api/register/admin`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken as string,
      },
      body: JSON.stringify(data),
      cache: "no-cache",
    }
  );
  const adminInfo = res.json();
  return adminInfo;
};

export default registerAdmin;
