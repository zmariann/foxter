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
    try {
      const response = await fetch("api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });
      const data = await response.json();
      toast(data.message.toString());
      // Handle successful login
    } catch (error: any) {
      toast(error.toString());
      // Handle login error
    }
  };

  // forgot password handle: Need to understand what exactly we need to do here,
  const handleForgotPassword = () => {};

  return (
    <div className="w-full max-w-xs m-auto">
      <ToastContainer position="top-center" limit={1} />
      <Image
        className=".brand img "
        src="/logo.png"
        width="500"
        height="500"
        alt="Brand Logo"
      />

      <form
        onSubmit={handleSignIn}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h1 className="mb-4 text-xl">Sign in to Foxter</h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
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
        <div className="mb-4">
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
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={handleForgotPassword}
            className="inline-block align-baseline font-bold text-sm text-green-600 hover:text-green-800"
          >
            Forgot password?
          </button>
        </div>
      </form>
      <p>
        Don't have an account?
        <Link href="/register" passHref>
          <span className="inline-block align-baseline font-bold text-sm text-green-600 hover:text-blue-800 ml-1">
            Sign up
          </span>
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
