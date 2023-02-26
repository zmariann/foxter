import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage: React.FC = () => {
  // States for registration
  const [name, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  // Handle methods:
  // name
  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setusername(event.target.value);
  };
  // password
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  // password again
  const handlePasswordAgain = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordAgain(event.target.value);
  };
  // Handling the form submission
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (name === "" || password === "") {
      toast.warn("Please enter all the fields");
    } else if (password !== passwordAgain) {
      toast.warn("Passwords doesn't match");
    } else {
      try {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, password }),
        });
        if (response.status === 400) {
          toast.error((await response.json()).error);
        } else if (response.status === 500) {
          toast.error((await response.json()).error);
        } else {
          toast.success("User " + name + " successfully registered");
        }
      } catch (error: any) {
        toast.error(error.toString());
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center border rounded bg-register-logoutBG bg-[#D9D9D9]">
      <ToastContainer position="top-center" limit={1} autoClose={900} />
      <div className="w-full max-w-xs">
        <form className="bg-whiteFox shadow-2xl rounded-[10px] px-8 pt-6 pb-8 mb-4">
          <h1 className=" text-darkFox flex justify-center mt-2">
            Register a new Foxter
          </h1>

          <div className="mb-4">


              <div className="relative flex justify-end pr-2 h-50 w-500">
                <img
                  className="absolute max-w-full h-6 w-6"
                  alt="logo"
                  src="formIcons/user-96.png"
                />
                <img
                  className="absolute max-w-full h-6 w-6"
                  alt="logo"
                  src="formIcons/hide-96.png"
                />
                <img
                  className="absolute max-w-full h-6 w-6"
                  alt="logo"
                  src="formIcons/hide-96.png"
                />
              </div>


            <input
              value={name}
              onChange={handleName}
              className="shadow appearance-none border rounded-[8px] w-full py-2 pl-3 pr-8 text-lightGray bg-whiteFox leading-tight focus:outline-none focus:shadow-outline mt-6"
              type="text"
              placeholder="Username"
            />

            
            <div className="mb-6">
              <input
                value={password}
                onChange={handlePassword}
                className="shadow appearance-none border rounded-[8px] w-full py-2 pl-3 pr-8 text-lightGray bg-whiteFox leading-tight focus:outline-none focus:shadow-outline mt-6"
                type="password"
                placeholder="Password"
              />
            </div>

            <div className="mb-6">
              <input
                value={passwordAgain}
                onChange={handlePasswordAgain}
                className="shadow appearance-none border  rounded-[8px] w-full py-2 pl-3 pr-8 text-lightGray bg-whiteFox leading-tight focus:outline-none focus:shadow-outline"
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
            <a
              href="/login"
              className="inline-block align-baseline font-bold text-sm text-greenFox hover:text-[#387354] cursor-pointer"
            >
              Log In
            </a>
          </div>
          <div className="flex items-center justify-center mt-3">
            <img className="h-8 max-w-full" alt="logo" src="/logo.png" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
