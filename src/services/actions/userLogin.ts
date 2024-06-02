import setAccessToken from "./setAccessToken";

export const userLogin = async (data: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL as string}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    }
  );

  const userInfo = await res.json();
  const passwordChangeRequired = userInfo.data.needPasswordChange;

  if (userInfo.data.accessToken) {
    setAccessToken(userInfo.data.accessToken, {
      redirect: "/dashboard",
      passwordChangeRequired,
    });
  }

  return userInfo;
};
