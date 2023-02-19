import { useState } from "react";

const RegisterPage: React.FC = () => {
  // States for registration
  const [username, setusername] = useState("");
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
    if (username === "" || password === "") {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
      console.log(username, password);
      try {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
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
        <h1>User {username} successfully registered!!</h1>
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
    <div className="form">
      <div>
        <h1>Fox Registration</h1>
      </div>
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>
      <form>
        <label className="label">Username</label>
        <input
          value={username}
          onChange={handleName}
          className="input"
          type="text"
        />
        <input
          value={password}
          onChange={handlePassword}
          className="input"
          type="password"
        />
        <button onClick={handleSubmit} className="btn" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
