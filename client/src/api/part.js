import axios from "axios";
import { base_url } from "@/utils/utils.js";
import { authHeader, noAuthHeader } from "@/api/headers.js";

export const addPart = async (data) => {
  return await axios.post(`${base_url}/part/new`, data, {
    headers: authHeader()
  });
};
