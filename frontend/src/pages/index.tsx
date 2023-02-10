import React, { useEffect, useState } from "react";

interface Fox {
  id: number;
  content: string;
  created_at: Date;
}

const FoxForm: React.FC = () => {
  const [text, setText] = useState("");
  const [foxes, setFoxes] = useState<Fox[]>([]);

  const fetchFoxes = async () => {
    const response = await fetch("/api/foxes");
    setFoxes(await response.json());
    console.log(foxes);
  };

  useEffect(() => {
    fetchFoxes();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/foxes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: text }),
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      setText("");
      fetchFoxes();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/foxes/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      fetchFoxes();
    } catch (error) {
      console.error(error);
    }
  };

  
  return (
    <>
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
      <div>
        <ul>
          {foxes.map((fox) => {
            return <li>{fox.content}</li>;
          })}
        </ul>
      </div>
    </>
  );
};


export default FoxForm;
