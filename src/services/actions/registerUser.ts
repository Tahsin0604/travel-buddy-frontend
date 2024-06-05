"use server";
const registerUser = async (data: any) => {
  const res = await fetch(`http://localhost:5000/api/register/user`, {
    method: "POST",
    body: JSON.stringify(data),
    cache: "no-cache",
  });
  const userInfo = res.json();
  return userInfo;
};

export default registerUser;
