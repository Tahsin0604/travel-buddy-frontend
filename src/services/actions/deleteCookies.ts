"use server";
import { cookies } from "next/headers";

const deleteCookies = async (keys: string[]) => {
  keys.forEach((key) => {
    cookies().delete(key);
  });
};

export default deleteCookies;
