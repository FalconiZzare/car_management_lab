import axios from "axios";
import { base_url } from "@/utils/utils.js";
import { noAuthHeader } from "@/api/headers.js";

export const addRent = async (data) => {
  return await axios.post(`${base_url}/rent/new`, data, {
    headers: noAuthHeader()
  });
};

export const getRents = async (id) => {
  return await axios.get(`${base_url}/rent/list/${id}`, {
    headers: noAuthHeader()
  });
};

export const deleteRent = async (id) => {
  return await axios.delete(`${base_url}/rent/${id}`, {
    headers: noAuthHeader()
  });
};
