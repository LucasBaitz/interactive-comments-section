import { AxiosResponse } from "axios";
import Credentials from "@/interfaces/User/Credentials";
import Registration from "@/interfaces/User/Registration";
import clientConfig from "./config/clientConfig";
import TokenResponse from "@/interfaces/User/TokenResponse";
import { clearUserStorage, getUserJwt, storeUser } from "@/utils/userStorage";

export const register = async (userInfo: Registration): Promise<boolean> => {
  try {
    const response = await clientConfig.post("/api/Auth/Register", userInfo);
    return response.status === 200;
  } catch (error) {
    console.error(`Registration failed: ${error}`);
    return false;
  }
};

export const login = async (credentials: Credentials): Promise<boolean> => {
  try {
    const response: AxiosResponse<TokenResponse> = await clientConfig.post(
      "/api/Auth/Login",
      credentials
    );

    storeUser(response.data);

    return true;
  } catch (error) {
    console.error(`Authentication failed: ${error}`);
    return false;
  }
};

export const deleteAccount = async (): Promise<AxiosResponse> => {
  try {
    const response = await clientConfig.delete("api/Auth/Delete");
    logout();
    if (response.status === 204) {
      return response;
    }

    throw new Error(`Failed to delete Account. Status: ${response.status}`);
  } catch (error) {
    console.error(`Error deleting Account: ${error}`);
    throw error;
  }
};

export const uploadPicture = async (imageFile: File) => {
  try {
    const formData = new FormData();

    formData.append("image", imageFile);

    const response = await clientConfig.post(
      "api/Auth/Upload/Picture",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      return response;
    }

    throw new Error(`Failed to upload picture. Status: ${response.status}`);
  } catch (error) {
    // Handle errors
    console.error(`Error uploading picture: ${error}`);
    throw error;
  }
};

export const logout = (): void => {
  clearUserStorage();
};

export const isAuthenticated = (): boolean => {
  const token = getUserJwt()
  return token !== "" && token !== " " && token !== null;
};
