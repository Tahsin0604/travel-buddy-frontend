const registerUser = async (data: any) => {
  const res = await fetch(
    `https://travel-buddy-ecru.vercel.app/api/register/user`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-cache",
    }
  );
  const userInfo = res.json();
  return userInfo;
};

export default registerUser;
