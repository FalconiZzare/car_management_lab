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
