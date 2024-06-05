import setAccessToken from "./setAccessToken";

export const userLogin = async (data: any) => {
  const res = await fetch(`http://localhost:5000/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  const userInfo = await res.json();

  if (userInfo?.data?.accessToken) {
    await setAccessToken(userInfo.data.accessToken);
  }

  return userInfo;
};
