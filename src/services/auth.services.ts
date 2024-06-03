import { authKey } from "@/constants/authKey";
import { axiosInstance } from "@/helpers/axios/axiosInstance";
import { decodeToken } from "@/utils/jwt";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/localStorageUtils";

export const storeUserInfo = async (accessToken: string) => {
  return await setToLocalStorage(authKey, accessToken);
};

export const getUserInfo = async () => {
  const authToken = getFromLocalStorage(authKey);

  if (authToken !== undefined || authToken !== null || authToken !== "") {
    const decodedData: any = decodeToken(authToken as string);
    return {
      ...decodedData,
      role: decodedData?.role,
    };
  } else {
    return "";
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    return !!authToken;
  }
};

export const removeUser = () => {
  return removeFromLocalStorage(authKey);
};

export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: `${process.env.NEXT_PUBLIC_API_URL as string}/auth/refresh-token`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};
