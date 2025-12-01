import api from "./api";

export const login = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const registerUser = async (username, email, password) => {
  const res = await api.post("/auth/register", { username, email, password });
  return res.data;
};

export const getProfile = async () => {
  const res = await api.get("/users/profile");
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await api.put("/users/profile", data);
  return res.data;
};
