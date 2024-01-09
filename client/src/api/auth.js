import axios from "axios";
import { base_url } from "@/utils/utils.js";
import { authHeader, noAuthHeader } from "@/api/headers.js";

export const login = async (data) => {
  return await axios.post(`${base_url}/auth/login`, data, {
    headers: noAuthHeader()
  });
};

export const signup = async (data) => {
  return await axios.post(`${base_url}/auth/signup`, data, {
    headers: noAuthHeader()
  });
};

export const getUser = async (id) => {
  return await axios.get(`${base_url}/auth/user?id=${id}`, {
    headers: noAuthHeader()
  });
};

export const updateUser = async (id, data) => {
  return await axios.put(`${base_url}/auth/user/${id}`, data, {
    headers: noAuthHeader()
  });
};

export const getUsers = async () => {
  return await axios.get(`${base_url}/auth/users`, {
    headers: authHeader()
  });
};

export const updateUserRole = async (id, data) => {
  return await axios.put(`${base_url}/auth/user/update-role/${id}`, data, {
    headers: authHeader()
  });
};

export const deleteUser = async (id) => {
  return await axios.delete(`${base_url}/auth/user/${id}`, {
    headers: authHeader()
  });
};
