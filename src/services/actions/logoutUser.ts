import { authKey } from "@/constants/authKey";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import deleteCookies from "./deleteCookies";

export const logoutUser = async (router: AppRouterInstance) => {
  await router.push("/");
  router.refresh();
  localStorage.removeItem(authKey);
  await deleteCookies([authKey, "refreshToken"]);
};
