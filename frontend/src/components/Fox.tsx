import React from "react";
import LikeButton from "../components/LikeButton";
import type { FoxProps } from "../../../shared/types";

interface Props {
  fox: FoxProps;
  onDeleteFox: (id: number) => void;
}

const Fox: React.FC<Props> = ({ fox, onDeleteFox }) => {
  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/foxes/${id}`, {
        method: "DELETE",
      });
      onDeleteFox(id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <li key={fox.id} style={{ margin: "20px 0" }}>
        {fox.content}
        <span style={{ marginLeft: "10px" }}></span>

        {/* like Button */}
        <LikeButton foxId={fox.id} initialLikes={fox.likes} />

        {/* Delete Button */}
        <button onClick={() => handleDelete(fox.id)}>Delete</button>
      </li>
    </>
  );
};

export default Fox;
