// import type {FoxProps as FoxInterface} from '../../../shared/types'
// import {NextPage} from 'next'

// const Fox: NextPage <{props: FoxInterface}> = (props) => {
//     return (
//         <>
//         <p>{props.props.content}</p>
//         </>
//     )
// }

// const fox = {id: 0 , content: "Hello"};
// <div>
//     <Fox props={fox}></Fox>
// </div>

import React, { useEffect, useState } from "react";
import LikeButton from "../components/LikeButton";
import type { FoxProps } from "../../../shared/types";


const FoxForm: React.FC<FoxProps> = ({ foxes, onAddFox, onDeleteFox }) => {
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
      onAddFox(text);
    } catch (error) {
      console.error(error);
    }
  };

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
      <div style={{ display: "flex", flexDirection: "column" }}>
        <form onSubmit={handleSubmit}>
          <label>
            Content:
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
          </label>
          <button type="submit">Submit</button>
        </form>

                 <ul style={{ listStyle: "none", textAlign: "center" }}>
                  {/* Map through foxes array and render fox content and delete button */}
                  {foxes.map((fox) => {
                    return (
                      <li key={fox.id} style={{ margin: "20px 0" }}>
                        {fox.content}
                        <span style={{ marginLeft: "10px" }}></span>

                        {/* like Button */}
                        <LikeButton foxId={fox.id} initialLikes={fox.likes} />

                        {/* Delete Button */}
                        <button onClick={() => handleDelete(fox.id)}>
                          Delete
                        </button>
                      </li>
                    );
                  })}
                </ul>
        
      </div>
    </>
  );
};

export default FoxForm;
