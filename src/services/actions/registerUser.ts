"use server";
const registerUser = async (data: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL as string}/register/user`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-cache",
    }
  );
  const userInfo = res.json();
  return userInfo;
};

export default registerUser;
