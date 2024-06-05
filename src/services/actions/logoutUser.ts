import { authKey } from "@/constants/authKey";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import deleteCookies from "./deleteCookies";

export const logoutUser = (router: AppRouterInstance) => {
  router.push("/");
  router.refresh();
  localStorage.removeItem(authKey);
  deleteCookies([authKey, "refreshToken"]);
};
