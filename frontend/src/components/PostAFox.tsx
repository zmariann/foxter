// importing necesary React packages and FoxProp types
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { betterFetch } from "../utils/utils";

// defining PostAFox component property
interface PostAFoxProps {
  onRefresh: () => void;
}

// the PostAFox Component creation
const PostAFox: React.FC<PostAFoxProps> = ({ onRefresh }) => {
  // setting initial state for the text input field
  const [text, setText] = useState("");
  const router = useRouter();
  const foxInput = useRef<HTMLTextAreaElement>(null);
  

  // method to handle text input submision
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // sending a POST request to the API to generate a new fox entry
      const response = await betterFetch("/api/foxes", {
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

  useEffect(() => {
    foxInput.current?.focus();
  }, []);

  // rendering PostAFox component/
  return (
    <form className="flex flex-col w-full" onSubmit={handleSubmit}>
      <div className="flex">
        <div className="flex-1 pt-2 mt-2">
          <textarea
            className="bg-transparent text-gray-400 font-medium text-lg w-full"
            rows={2}
            placeholder="What's happening?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            ref={foxInput}
          ></textarea>
        </div>
      </div>
      <div className="flex">
        <div className="flex-1">
          <button className="bg-green-400 mt-5 hover:bg-green-600 text-white font-bold py-2 px-8 rounded-full mr-8 float-right">
            FoxIt
          </button>
        </div>
      </div>
    </form>
  );
};

// exporting PostAFox component
export default PostAFox;
