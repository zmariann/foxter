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
    <div className="flex flex-col items-center mt-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-4 bg-white shadow-md rounded"
      >
        <div className="flex items-center border-b-2 border-green-500 py-2">
          <label htmlFor="fox-input" className="sr-only">
            Post a Fox
          </label>
          <input
            id="fox-input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's happening?"
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          />
          <button
            type="submit"
            disabled={!text.trim()}
            className={`bg-greenFox hover:bg-green-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              !text.trim() && 'opacity-50 cursor-not-allowed'
            }`}
          >
            FoxIt
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostAFox;