import { toastError } from "./toastAlert";
import { ApiResponse } from "@/features/auth/types/auth";

const apiResponseErrors = async (error: unknown) => {
  const castedError = error as ApiResponse;

  if (castedError.message === "Network Error") {
    toastError(castedError.message);
    return;
  }

  const errorMessage = castedError.response?.data.message;

  // when error message is an array
  // display first error in the array
  if (typeof errorMessage === "object")
    return toastError(castedError.response?.data.message[0]);

  // when error message is a string
  return toastError(castedError.response?.data.message);
};

export default apiResponseErrors;
