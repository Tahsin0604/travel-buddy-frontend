import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { authKey } from "./constants/authKey";
import { decodeToken } from "./utils/jwt";

type TRole = keyof typeof roleBasedPrivateRoutes;
const authRoutes = ["/login", "/register"];
const commonPrivateRoutes = [
  "/dashboard/profile",
  "/dashboard/change-password",
  /^\/trips\/request\/[^\/]+$/,
];
const roleBasedPrivateRoutes = {
  USER: [/^\/dashboard\/user/],
  ADMIN: [/^\/dashboard\/admin/],
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const accessToken = cookies().get(authKey)?.value;

  const redirectToLogin = (url: string) => {
    const loginUrl = new URL(`/login`, req.url);
    loginUrl.searchParams.set("redirect", url);
    return NextResponse.redirect(loginUrl);
  };

  if (!accessToken) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return redirectToLogin(pathname);
    }
  }

  const commonPrivateRouteMatched = commonPrivateRoutes.some(
    (route) => route === pathname || pathname.match(route)
  );

  if (accessToken && commonPrivateRouteMatched) {
    return NextResponse.next();
  }
  let decodedData = null;
  if (accessToken) {
    decodedData = decodeToken(accessToken) as any;
  }
  const role = decodedData?.role;
  if (role && roleBasedPrivateRoutes[role as TRole]) {
    const routes = roleBasedPrivateRoutes[role as TRole];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }
  return NextResponse.redirect(new URL("/", req.url));
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard/:page*",
    "/trips/request/:page*",
  ],
};
