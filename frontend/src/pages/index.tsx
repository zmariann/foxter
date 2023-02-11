import React, { useEffect, useState } from "react";

// Define the shape of the fox data
interface Fox {
  id: number;
  content: string;
  created_at: Date;
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
    {/* Render Text input field and Post a Fox button */}
      <div
        style={{
          display: "flex",
          height: "20vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            style={{ padding: "10px", fontSize: "18px" }}
          />
          <button
            type="submit"
            style={{ marginLeft: "10px", padding: "10px", fontSize: "18px" }}
          >
            Post a fox
          </button>
        </form>
      </div>

      {/* Render Foxes and Delete button */}

      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {foxes.length === 0 ? (
            <p style={{ textAlign: "center" }}>No foxes to show. Post one!</p>
          ) : (
            <ul style={{ listStyle: "none", textAlign: "center" }}>
              {foxes.map((fox) => {
                return (
                  <li key={fox.id} style={{ margin: "20px 0" }}>
                    {fox.content}
                    <span style={{ marginLeft: "10px" }}></span>
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

export default FoxForm;
