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
      toast("User has already been logged in");
      return;
    }
    try {
      const response = await fetch("api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });
      // handle successful login
      const data = await response.json();
      toast(data.message.toString());
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        toast("Invalid credentials");
      } else {
        toast(error.toString());
      }
      // Handle login error
    }
  };

  // forgot password handle: Need to understand what exactly we need to do here,
  const handleForgotPassword = () => {};

  return (
    <div className="flex flex-col items-center justify-center h-screen mx-auto p-20 bg-gray-200">
      <div className="w-full max-w-md m-auto rounded-2xl bg-white shadow-md">
        <ToastContainer position="top-center" limit={1} />
        <form onSubmit={handleSignIn} className="px-10 pt-8 pb-8 rounded-lg">
          <h1 className="mb-6 text-xl text-center">Sign in to Foxter</h1>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={name}
              onChange={handleUsernameChange}
              className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="**********"
              value={password}
              onChange={handlePasswordChange}
              className="shadow appearance-none border rounded border-gray-500 w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full"
            >
              Sign in
            </button>
          </div>
          <div className="text-center mb-6">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-green-600 hover:text-green-800"
            >
              Forgot password?
            </button>
          </div>
        </form>
        <p className="text-center mb-4">
          Don't have an account?
          <Link href="/register" passHref>
            <span className="inline-block font-bold text-green-600 hover:text-blue-800 ml-1">
              Sign up
            </span>
          </Link>
        </p>
      </div>
      <div className="mt-4">
        <Image
          className="block mx-auto"
          src="/logo.png"
          width="150"
          height="150"
          alt="Brand Logo"
        />
      </div>
    </div>
  );
};

export default LoginPage;
