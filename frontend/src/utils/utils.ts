import { toast } from "react-toastify";
import { setAuthStatus, setCurrentUserId, setCurrentUserName } from "./authStatus";

export async function betterFetch(url: string, options: any | null = {}) {
  const response = await fetch(url, options);

  if (response.status === 400) {
    // Display an error toast message prompting the user to login
    toast.error("Please login or register to continue");
    setAuthStatus(null)
    setCurrentUserId(null)
    setCurrentUserName(null)
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000)
    // Redirect the user to the login page

    // Throw an error to prevent further execution of the function
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    // Throw an error with the error message returned from the API
    throw new Error((await response.json()).error);
  }

  return await response.json();
} 