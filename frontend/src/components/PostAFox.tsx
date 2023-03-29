// importing necesary React packages and FoxProp types
import React, { useState } from "react";
import type { FoxProps } from "../../../shared/types";

// defining PostAFox component property
interface PostAFoxProps {
  onRefresh: () => void;
}

// the PostAFox Component creation
const PostAFox: React.FC<PostAFoxProps> = ({ onRefresh }) => {
  // setting initial state for the text input field
  const [text, setText] = useState("");
  // method to handle text input submision
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // sending a POST request to the API to generate a new fox entry
      await fetch("/api/foxes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // converting the text-input to a JSON string as the request body
        body: JSON.stringify({ content: text }),
      });
      // clearing the text input field after input submission is sucessfull
      setText("");
      // Refreshing the list of foxes to get the new Fox entry reflected on screen
      onRefresh();
    } catch (error) {
      console.error(error);
    }
  };
  // rendering PostAFox component/
  return (
    <div className="flex flex-col items-center mt-8">
      Form
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-4 bg-white shadow-md rounded"
      >
        <div className="flex items-center border-b-2 border-green-500 py-2">
          <label htmlFor="fox-input" className="sr-only">
            Post a Fox
          </label>
          {/* Input field to enter the fox content. */}
          <input
            id="fox-input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's on your mind?"
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          />
          {/* submit button */}
          <button
            type="submit"
            disabled={!text.trim()}
            className={`bg-greenFox hover:bg-green-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              !text.trim() && "opacity-50 cursor-not-allowed"
            }`}
          >
            FoxIt
          </button>
        </div>
      </form>
    </div>
  );
};

// exporting PostAFox component
export default PostAFox;
