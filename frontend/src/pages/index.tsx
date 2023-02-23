import Link from "next/link";
import React, { useEffect, useState } from "react";

// Define the shape of the fox data
interface Fox {
  id: number;
  content: string;
  created_at: Date;
}

interface User {
  name: string;
  isAuthenticated: boolean;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

const FoxForm: React.FC = () => {
  // State to store the text input value
  const [text, setText] = useState("");

  // State to store the foxes data
  const [foxes, setFoxes] = useState<Fox[]>([]);

  // Function to fetch the foxes data from the API
  const fetchFoxes = async () => {
    // Fetch the foxes data from the API
    const response = await fetch("/api/foxes");
    // Update the foxes state with the response data
    setFoxes(await response.json());
    // Log the foxes data in the console for debugging purposes
    console.log(foxes);
  };

  // Use effect hook to fetch the foxes data when the component is mounted
  useEffect(() => {
    fetchFoxes();
  }, []);

  // Function to handle the form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent the default form submit behavior
    event.preventDefault();
    try {
      // Send a POST request to the API to create a new fox
      const response = await fetch("/api/foxes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: text }),
      });
      // If the response is not ok, throw an error
      if (!response.ok) {
        throw new Error(await response.text());
      }
      // Clear the text input
      setText("");
      // Fetch the updated foxes data
      fetchFoxes();
    } catch (error) {
      // Log the error in the console for debugging purposes
      console.error(error);
    }
  };

  // Function to handle the deletion of a fox
  const handleDelete = async (id: number) => {
    try {
      // Send a DELETE request to the API to delete a fox
      const response = await fetch(`/api/foxes/${id}`, {
        method: "DELETE",
      });
      // If the response is not ok, throw an error
      if (!response.ok) {
        throw new Error(await response.text());
      }
      // Fetch the updated foxes data
      fetchFoxes();
    } catch (error) {
      // Log the error in the console for debugging purposes
      console.error(error);
    }
  };

  return (
    <>
    {/*  Test Tailwind */}
      {/*<h1 className="text-3xl font-bold underline">Hello world! with Tailwind</h1>*/}
      {/* || Render Text input field and Post a Fox button */}
      <div
        style={{
          display: "flex",
          height: "20vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Form for submitting a fox post */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            style={{ padding: "10px", fontSize: "18px" }}
          />
          {/* Submit button for posting the fox */}
          <button
            type="submit"
            style={{ marginLeft: "10px", padding: "10px", fontSize: "18px" }}
          >
            Post a fox
          </button>
        </form>
      </div>

      {/* || Render Foxes and Delete Button */}
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {/* Display "No foxes to show. Post one!" message when foxes array is empty */}
          {foxes.length === 0 ? (
            <p style={{ textAlign: "center" }}>No foxes to show. Post one!</p>
          ) : (
            <ul style={{ listStyle: "none", textAlign: "center" }}>
              {/* Map through foxes array and render fox content and delete button */}
              {foxes.map((fox) => {
                return (
                  <li key={fox.id} style={{ margin: "20px 0" }}>
                    {fox.content}
                    <span style={{ marginLeft: "10px" }}></span>
                    {/* Delete Button */}
                    <button onClick={() => handleDelete(fox.id)}>Delete</button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

const Navigation: React.FC<User> = ({
  isAuthenticated,
  onLoginClick,
  onLogoutClick,
}) => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/Messages">
            <a>Messages</a>
          </Link>
        </li>
        {isAuthenticated ? (
          <li>
            <button onClick={onLogoutClick}>Logout</button>
          </li>
        ) : (
          <li>
            <button onClick={onLoginClick}>Login</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default FoxForm;
