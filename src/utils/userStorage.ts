import { defaultUser } from "@/api/mock/user";
import TokenResponse from "@/interfaces/User/TokenResponse";

const USER_STORAGE_KEY = "user";

export const storeUser = (string: TokenResponse) => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(string));
};

const getUser = () => {
  const userData = localStorage.getItem(USER_STORAGE_KEY);

  if (userData) {
    return JSON.parse(userData);
  }

  return new Object();
};

export const getUserUsername = () => {
  const user: TokenResponse = getUser();

  return user.userName ? user.userName : defaultUser.userName;
};

export const getUserEmail = () => {
  const user: TokenResponse = getUser();

  return user.email ? user.email : defaultUser.email;
};

export const getUserPicture = () => {
  const user: TokenResponse = getUser();

  return user.image ? user.image : defaultUser.image;
};

export const getUserJwt = () => {
  const user: TokenResponse = getUser();

  return user.token ? user.token : "";
};

export const clearUserStorage = () => {
  localStorage.removeItem(USER_STORAGE_KEY);
};
