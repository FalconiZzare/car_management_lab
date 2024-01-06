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
