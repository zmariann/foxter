import { useState } from "react";
import logo from "./logo.png";

const RegisterPage: React.FC = () => {
  // States for registration
  const [name, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handle methods:
  // name
  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setusername(event.target.value);
    setSubmitted(false);
  };
  // password
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setSubmitted(false);
  };
  // password again
  const handlePasswordAgain = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordAgain(event.target.value);
    setSubmitted(false);
  };
  // Handling the form submission
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (name === "" || password === "") {
      setError(true);
    } else if (password !== passwordAgain) {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
      console.log(name, password);
      try {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, password }),
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h1>User {name} successfully registered</h1>
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  return (
    <div className="h-screen flex items-center justify-center border rounded bg-greenFox">
      <div className="w-full max-w-xs">
        <div className="">
          {errorMessage()}
          {successMessage()}
        </div>

        <form className="bg-whiteFox shadow-2xl rounded-[10px] px-8 pt-6 pb-8 mb-4">
          <h1 className="text-darkFox flex justify-center mt-2">
            Register a new Foxter
          </h1>

          <div className="mb-4">
            <input
              value={name}
              onChange={handleName}
              className="shadow appearance-none border rounded-[8px] w-full py-2 px-3 text-lightGray bg-whiteFox leading-tight focus:outline-none focus:shadow-outline mt-6"
              type="text"
              placeholder="Username"
            />
            <div className="mb-6">
              <input
                value={password}
                onChange={handlePassword}
                className="shadow appearance-none border border-red-500 rounded-[8px] w-full py-2 px-3 text-lightGray bg-whiteFox leading-tight focus:outline-none focus:shadow-outline mt-6"
                type="password"
                placeholder="Password"
              />
            </div>

            <div className="mb-6">
              <input
                value={passwordAgain}
                onChange={handlePasswordAgain}
                className="shadow appearance-none border border-red-500 rounded-[8px] w-full py-2 px-3 text-lightGray bg-whiteFox leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="Password"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="bg-greenFox hover:bg-[#387354] text-whiteFox py-1  rounded-full w-full text-center"
              type="submit"
            >
              Sign Up
            </button>
          </div>
          <div className="flex items-center justify-center">
            <h2 className="inline-block align-baseline font-bold text-sm text-darkFox">
              Already have an account? &nbsp;
            </h2>
            <a className="inline-block align-baseline font-bold text-sm text-greenFox hover:text-[#387354] cursor-pointer">
              Log In
            </a>
          </div>
          <div className="flex items-center justify-center mt-8 mb-2">
            <img className="h-auto max-w-full" src="" alt="logo" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
