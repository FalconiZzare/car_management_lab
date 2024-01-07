export const base_url = "http://localhost:5000/api";

export const base_image_url = "http://localhost:5000/images";

export const getLocalStorageItem = (item) => {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem(item);
  }
  return null;
};

export const setLocalStorageItem = (item, value) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(item, value);
  }
};

export const removeLocalStorageItem = (item) => {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem(item);
  }
};

export const getAvatarFallback = (string) => {
  const parts = string.split(" ");
  return `${parts[0].charAt(0)}${parts[1] ? parts[1].charAt(0) : ""}`;
};
