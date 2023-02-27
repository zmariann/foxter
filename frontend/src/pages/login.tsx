// importing useState from React lib to manage states of a FC
// importing Link for client-side navigation between pages
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage: React.FC = () => {
  const [name, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // handleUsernameChange and handlePasswordChange functions are called
  // whenever values of the username and password input fields are changed
  // Receives an event object
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  // handleSignIn() is called when the "Sign in" button is clicked.
  // sends a POST request to a login API endpoint (/api/login) with the username and password
  const handleSignIn = async (event: any) => {
    event.preventDefault();
    // Check if user is already logged in
    const token = localStorage.getItem("token");
    if (token) {
      toast.warn("User has already been logged in");
      return;
    }
    try {
      const response = await fetch("api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw data;
      }
      // handle successful login
      toast.success(data.message.toString());
    } catch (error: any) {
      if ("error" in error) {
        toast.warn(error.error);
      } else {
        toast.error(JSON.stringify(error));
      }
      // Handle login error
    }
  };

  // forgot password handle: Need to understand what exactly we need to do here,
  const handleForgotPassword = () => {};

  // handle toggle for show & hide password
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen mx-auto p-20 bg-registerLogoutBG">
      <ToastContainer position="top-center" limit={1} autoClose={900} />
      <div className="w-full max-w-[350px]">
        <form
          onSubmit={handleSignIn}
          className="bg-whiteFox shadow-2xl rounded-[10px] px-8 pt-8 pb-8 mb-10"
        >
          <h1 className="text-xl text-darkFox flex justify-center mt-2">
            Sign In to Foxter
          </h1>
          <div className="mb-4">
            <div className="relative flex justify-end pr-2">
              <img
                className="absolute max-w-full h-6 w-6 mt-8"
                alt="logo"
                src="formIcons/user-96.png"
              />
              {open === false ? (
                <img
                  className="absolute max-w-full h-6 w-6 mt-[95.5px]"
                  alt="logo"
                  src="formIcons/hide-96.png"
                  onClick={handleToggle}
                />
              ) : (
                <img
                  className="absolute max-w-full h-6 w-6 mt-[94px]"
                  alt="logo"
                  src="formIcons/eye-96.png"
                  onClick={handleToggle}
                />
              )}
            </div>

            <input
              type="text"
              id="username"
              placeholder="Username"
              value={name}
              onChange={handleUsernameChange}
              className="shadow appearance-none border rounded-[8px] w-full py-2 pl-3 pr-8 text-lightGray bg-whiteFox leading-tight focus:outline-none focus:shadow-outline mt-6"
            />
          </div>
          <div className="mb-6">
            <input
              type={open === false ? "password" : "text"}
              id="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className="shadow appearance-none border rounded-[8px] w-full py-2 pl-3 pr-8 text-lightGray bg-whiteFox leading-tight focus:outline-none focus:shadow-outline mt-3"
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="bg-greenFox hover:bg-[#387354] text-whiteFox py-1  rounded-full w-full text-center"
            >
              Sign In
            </button>
          </div>
          <div className="text-center mb-6">
            <p className="text-center font-bold text-darkFox mb-4 text-sm">
              Don't have an account?
              <Link href="/register" passHref>
                <span className="inline-block font-bold text-greenFox hover:text-[#387354] ml-1">
                  Sign Up
                </span>
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div>
        <Image
          className="block mx-auto"
          src="/logo.png"
          width="90"
          height="90"
          alt="Brand Logo"
        />
      </div>
    </div>
  );
};

export default LoginPage;
