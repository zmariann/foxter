// importing useState from React lib to manage states of a FC
// importing Link for client-side navigation between pages
import { useState } from "react";
import Link from "next/link";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
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
  const handleSignIn = async () => {
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      console.log(data);
      // Handle successful login
    } catch (error) {
      console.error(error);
      // Handle login error
    }
  };

 // forgot password handle: Need to understand what exactly we need to do here,
  const handleForgotPassword = () => {
   
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 style={{ margin: "1rem 0" }}>Sign in to Foxter</h1>
      <label htmlFor="username" style={{ marginBottom: "0.5rem" }}>Username</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={handleUsernameChange}
        style={{ marginBottom: "1rem", padding: "0.5rem" }}
      />
      <label htmlFor="password" style={{ marginBottom: "0.5rem" }}>Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={handlePasswordChange}
        style={{ marginBottom: "1rem", padding: "0.5rem" }}
      />
      <button onClick={handleSignIn} style={{ marginBottom: "1rem", padding: "0.5rem 1rem" }}>Sign in</button>
      <button onClick={handleForgotPassword} style={{ padding: "0.5rem 1rem" }}>Forgot password</button>
      <p style={{ margin: "1rem 0" }}>
        Don't have an account?{" "}
        <Link href="/register" passHref>
          <span style={{ textDecoration: "underline", cursor: "pointer" }}>Sign up</span>
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
