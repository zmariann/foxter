// Including necessary React Packages, LikeComponent and Types
import React, { useEffect } from "react";
import LikeButton from "../components/LikeButton";
import type { FoxProps } from "../../../shared/types";
import DeleteButton from "./DeleteButton";
import { authStatus, getCurrentUserId } from "@/utils/authStatus";
import Link from "next/link";

// Defining Fox component  property
interface FProps {
  fox: FoxProps;
  onDeleteFox: (id: number) => void;
}

// Creating the Fox Component
const Fox: React.FC<FProps> = ({ fox, onDeleteFox }) => {
  const convertInputString = (input: string) => {
    input = input.replace(
      /#[a-z0-9A-Z]+/g,
      '<span style="color: rgb(74,222,128)">$&</span>'
    );
    return input;
  };

  // rendering Fox Component
  return (
    <div className="flex mb-6 flex-col w-full">
      <p className="text-base leading-6 text-white w-full mb-3">
        <Link href={`/profiles/${fox.userName}`}>{fox.userName}</Link>
        <span className="ml-4 text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
          {fox.createdAt.toString()}
        </span>
      </p>
      <p
        dangerouslySetInnerHTML={{ __html: convertInputString(fox.content) }}
        className="text-base font-medium text-white"
      ></p>
      {authStatus() ? (
        <div className="flex mt-2">
          <LikeButton foxId={fox.id} initialLikes={fox.likes} />
          {fox.userId == getCurrentUserId() ? (
            <DeleteButton foxId={fox.id} onDeleteFox={onDeleteFox} />
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
      <hr className="mt-4" />
    </div>
  );
};
export default Fox;
