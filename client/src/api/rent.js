import axios from "axios";
import { base_url } from "@/utils/utils.js";
import { noAuthHeader } from "@/api/headers.js";

export const addRent = async (data) => {
  return await axios.post(`${base_url}/rent/new`, data, {
    headers: noAuthHeader()
  });
};
