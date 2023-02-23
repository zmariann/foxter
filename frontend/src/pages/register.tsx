import { useState } from "react";

const RegisterPage: React.FC = () => {
  // States for registration
  const [name, setusername] = useState("");
  const [password, setPassword] = useState("");

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
  // Handling the form submission
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (name === "" || password === "") {
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
        <h1>User {name} successfully registered!!</h1>
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
    <div className="registerForm">
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>

      <form className="register">

        <div className="content">
          <h1>Register a new Foxter</h1>

          <div className="inpuContainer">
          <input
            value={name}
            onChange={handleName}
            className="input"
            type="text"
            placeholder="Username"
          />
          <input
            value={password}
            onChange={handlePassword}
            className="input"
            type="password"
            placeholder="Password"
          />
          <input
            value={password}
            onChange={handlePassword}
            className="input"
            type="password"
            placeholder="Password again"
          />

          <button onClick={handleSubmit} className="btn" type="submit">
            Sign Up
          </button>
          </div>

          <h3>Already have an account? Log In</h3>
          <div className="logoContainer">
            <div className="logo">logo</div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
