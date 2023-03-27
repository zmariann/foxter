import React, { useState } from "react";
import type { FoxProps } from "../../../shared/types";

interface PostAFoxProps {
  onRefresh: () => void;
}

const PostAFox: React.FC<PostAFoxProps> = ({ onRefresh }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await fetch("/api/foxes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: text }),
      });
      setText("");
      onRefresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <form onSubmit={handleSubmit}>
        <label>
          Content:
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostAFox;
