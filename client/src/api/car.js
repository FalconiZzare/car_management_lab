import axios from "axios";
import { base_url } from "@/utils/utils.js";
import { authHeader, noAuthHeader } from "@/api/headers.js";

export const addMake = async (data) => {
  return await axios.post(`${base_url}/car/add-make`, data, {
    headers: authHeader()
  });
};

export const getMakes = async () => {
  return await axios.get(`${base_url}/car/makes`, {
    headers: noAuthHeader()
  });
};

export const getModels = async (data) => {
  return await axios.post(`${base_url}/car/models`, data, {
    headers: noAuthHeader()
  });
};

export const addCar = async (data) => {
  return await axios.post(`${base_url}/car/new`, data, {
    headers: authHeader()
  });
};

export const getCars = async (data) => {
  return await axios.post(`${base_url}/car/cars`, data, {
    headers: noAuthHeader()
  });
};
