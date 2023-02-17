import React, { useEffect, useState } from "react";

// Define the shape of the user data
interface User {
  id: number;
  content: string;
  password: string;
}

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //Prevent page reload
    event.preventDefault();
}

const LogIn = () => {
    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
        </div>
        <div className="input-container">
          <label>Password Again</label>
          <input type="password" name="pass" required />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
      </div>
      
    );
  };
    
  export default LogIn;