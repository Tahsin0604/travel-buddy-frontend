"use server";
const registerAdmin = async (data: any) => {
  const res = await fetch(`http://localhost:5000/api/register/admin`, {
    method: "POST",
    body: JSON.stringify(data),
    cache: "no-cache",
  });
  const adminInfo = res.json();
  return adminInfo;
};

export default registerAdmin;
