import { toast } from "react-toastify";
import { setAuthStatus, setCurrentUserId, setCurrentUserName } from "./authStatus";

export async function betterFetch(
  url: string,
  options: any | null = {}
) {
  const response = await fetch(url, { credentials: 'same-origin', withCredentials: true, ...options});

  if (response.status === 401) {
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

  const body = await response.json();

  if (!response.ok) {
    // Throw an error with the error message returned from the API
    throw new Error(body.error);
  }

  return body;
} 