import API from "./axios-client";
import {
  CurrentUserResponseType,
  LoginResponseType,
  loginType,
  registerType,
} from "@/types/api.type";

export const loginMutationFn = async (
  data: loginType
): Promise<LoginResponseType> => {
  const response = await API.post("/auth/login", data);
  return response.data;
};

export const registerMutationFn = async (data: registerType) =>
  await API.post("/auth/register", data);

export const getCurrentUserQueryFn =
  async (): Promise<CurrentUserResponseType> => {
    const response = await API.get(`/auth/current-user`);
    return response.data;
  };


  
// *********    IMAGES *****************
export const uploadImageMutationFn = async (data: FormData) => {
  return API.post("/dashboard/images", data);
};


export const viewImagesMutationFn = async () => {
  const response = await API.get("/dashboard/images");
  return response.data.paths;
};


export const analyseAIMutationFn = async (data: { filename: string }) => {  
  const response = await API.post("/dashboard/analyse-ai", data);  
  return response.data;
};