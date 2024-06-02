"use server";
const registerAdmin = async (data: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL as string}/register/admin`,
    {
      method: "POST",
      body: JSON.stringify(data),
      cache: "no-cache",
    }
  );
  const adminInfo = res.json();
  return adminInfo;
};

export default registerAdmin;
