// Including necessary React Packages, LikeComponent and Types
import React from "react";
import LikeButton from "../components/LikeButton";
import type { FoxProps } from "../../../shared/types";

// Defining Fox component  property
interface FProps {
  fox: FoxProps;
  onDeleteFox: (id: number) => void;
}

// Creating the Fox Component
const Fox: React.FC<FProps> = ({ fox, onDeleteFox }) => {
  // Method to delete a fox
  const handleDelete = async (id: number) => {
    try {
      // Sending delete request to the API to delete the fox
      await fetch(`/api/foxes/${id}`, {
        method: "DELETE",
      });
      // Removing the deleted fox from the list
      onDeleteFox(id);
    } catch (error) {
      console.error(error);
    }
  };
// rendering Fox Component 
  return (
    <>
      <li className="bg-white p-6 rounded shadow mb-8 flex flex-col max-w-xl">
        {/* Fox Content */}
        <p className="text-gray-900 text-lg">{fox.content}</p>
        <div className="flex items-center mt-4">
          {/* Like Button */}
          <LikeButton foxId={fox.id} initialLikes={fox.likes} />
  
          {/* Delete Button */}
          <button
            onClick={() => handleDelete(fox.id)}
            className="ml-4 bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Delete
          </button>
        </div>
      </li>
    </>
  );
};
export default Fox;