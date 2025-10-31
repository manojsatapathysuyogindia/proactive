// src/api/Service.ts
import apiClient from "./axiosInstance";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { navigateTo } from '../utils/navigation';
interface AxiosErrorResponse {
  message?: string;
}

// const handleError = (error: AxiosError) => {
//   const errorResponse = error.response?.data as AxiosErrorResponse;
//   if (error.response) {
//     return errorResponse.message || "An error occurred.";
//   } else if (error.request) {
//     return "No response from server.";
//   } else {
//     return error.message || "Something went wrong.";
//   }
// };

export const Service = async (
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  data?: any,
): Promise<{
  response: any | null;
  error: any;
  message: string;
  alldata: any;
}> => {
  try {
    const isMultipart = data instanceof FormData;
    console.log(isMultipart,"isMultipartisMultipart")
    const headers = isMultipart ? { "Content-Type": "multipart/form-data" } :{ Accept: "application/json" };

    const response = await apiClient({
      method,
      url,
      data,
      headers,
    });
console.log(response,'res')
    return {
      response: response.data || null,
      error: null,
      message: response.data?.message || "Success",
      alldata: response,
    };
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 401) {

     Cookies.remove("token");
     Cookies.remove("userName");
     Cookies.remove("userImage");
     Cookies.remove("current_role_id");
      navigateTo("/");
      return {
        response: null,
        error: "Session expired",
        message: "Unauthorized access",
        alldata: null,
      };
    }
    if (axiosError.response?.status === 403) {
      return {
        response: null,
        error: "Access forbidden",
        message: "Forbidden access",
        alldata: null,
      };
    }

      const errorResponse = axiosError.response?.data as AxiosErrorResponse;
    return {
        response: axiosError.response?.data,
        error: "Bad Request",
        message: errorResponse?.message || "Invalid input or bad request",
        alldata: axiosError.response?.data,

    };
  }
};