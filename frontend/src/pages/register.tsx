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
        } else {
          toast.success("User " + name + " successfully registered");
        }
      } catch (error: any) {
        toast.error(JSON.stringify(error));
      }
    }
  };

  // handle toggle for show & hide password
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen mx-auto p-20 bg-registerLogoutBG">
      <div className="w-full max-w-[350px]">
        <form className="bg-whiteFox shadow-2xl rounded-[10px] px-8 pt-10 pb-10 mb-10">
          <h1 className="text-xl text-darkFox flex justify-center">
            Register a new Foxter
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
              {open === false ? (
                <img
                  className="absolute max-w-full h-6 w-6 mt-[156px]"
                  alt="logo"
                  src="formIcons/hide-96.png"
                  onClick={handleToggle}
                />
              ) : (
                <img
                  className="absolute max-w-full h-6 w-6 mt-[155px]"
                  alt="logo"
                  src="formIcons/eye-96.png"
                  onClick={handleToggle}
                />
              )}
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
                className="shadow appearance-none border rounded-[8px] w-full py-2 pl-3 pr-9 text-lightGray bg-whiteFox leading-tight focus:outline-none focus:shadow-outline mt-6"
                type={open === false ? "password" : "text"}
                placeholder="Password"
              />
            </div>

            <div className="mb-6">
              <input
                value={passwordAgain}
                onChange={handlePasswordAgain}
                className="shadow appearance-none border  rounded-[8px] w-full py-2 pl-3 pr-9 text-lightGray bg-whiteFox leading-tight focus:outline-none focus:shadow-outline"
                type={open === false ? "password" : "text"}
                placeholder="Password again"
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
            <h2 className="inline-block align-baseline font-bold text-sm text-darkFox mb-1">
              Already have an account? &nbsp;
            </h2>
            <a
              href="/login"
              className="inline-block align-baseline font-bold text-sm text-greenFox hover:text-[#387354] mb-1 cursor-pointer"
            >
              Log In
            </a>
          </div>
        </form>
      </div>
      <div>
        <img
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

export default RegisterPage;
