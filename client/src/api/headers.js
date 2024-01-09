import { getLocalStorageItem } from "@/utils/utils.js";

export const noAuthHeader = () => {
  return {
    "Content-Type": "multipart/form-data"
  };
};

export const authHeader = () => {
  const authUser = getLocalStorageItem("x-user-id");

  if (authUser) {
    return {
      "x-user-id": authUser
    };
  }
  return null;
};

export const multiPartAuthHeader = () => {
  const authUser = getLocalStorageItem("x-user-id");

  if (authUser) {
    return {
      "x-user-id": authUser,
      "Content-Type": "multipart/form-data"
    };
  }
  return null;
};
