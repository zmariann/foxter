import { toast } from "react-toastify";

export async function betterFetch(url: string, options: any|null = {}) {
  const response = await fetch(url, options);


  if (response.status === 401) {
    // Display an error toast message prompting the user to login
    toast.error("Please login to continue");

    console.log("Sould be redirecting")
    console.log("Requested URL", url)

    // Redirect the user to the login page
    window.location.href = "/login";

    // Throw an error to prevent further execution of the function
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    // Throw an error with the error message returned from the API
    throw new Error((await response.json()).error);
  }

  return (await response.json());
}
