// importing useState from React lib to manage states of a FC
// importing Link for client-side navigation between pages
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/login.module.css";
import logo from "../public/logo.png";


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
  const handleSignIn = async () => {
    try {
      const response = await fetch("api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
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
  const handleForgotPassword = () => {};

  return (
    <div className={styles.container}>
       <div className={styles.brand}>
        <Image className=".brand img " src={logo} alt="Brand Logo"  />
      </div>

      <form className={styles.form} onSubmit={handleSignIn}>
        <h1>Sign in to Foxter</h1>
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={name}
          onChange={handleUsernameChange}
          className={styles.input}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className={styles.input}
        />
        <input type="submit" value="Sign in" className={styles.submitButton} />
        <button
          type="button"
          onClick={handleForgotPassword}
          className={styles.forgotPasswordButton}
        >
          Forgot password?
        </button>
      </form>
      <p style={{ margin: "1rem 0" }}>
        Don't have an account?{" "}
        <Link href="/register" passHref>
          <span style={{ textDecoration: "underline", cursor: "pointer" }}>
            Sign up
          </span>
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
