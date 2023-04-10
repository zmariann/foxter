import { betterFetch } from "@/utils/utils";
import { useEffect, useState } from "react";

interface Props {
  foxId: number;
  initialLikes: number;
}

const LikeButton: React.FC<Props> = ({ foxId, initialLikes }) => {
  const [likes, setLikes] = useState<number>(initialLikes);
  const [liked, setLiked] = useState<boolean>(false);

  const isUserLikedFox = async () => {
    try {
      const response = await betterFetch(`/api/fox_likes/${foxId}/likeStatus`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = response;
      if (data.status) {
        setLiked(true);
      } else setLiked(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await betterFetch(`/api/fox_likes/${foxId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = response;
      setLikes(data.count);
      setLiked(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnlike = async () => {
    try {
      const response = await betterFetch(`/api/fox_likes/${foxId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = response;
      setLikes(data.count);
      setLiked(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    isUserLikedFox()
  })

  return (
    <div>
      {liked ? (
        <a
          className="w-12 group flex items-center text-blue-500 mr-2 text-base leading-6 font-medium rounded-full"
          target="_blank"
          onClick={handleUnlike}
        >
          <svg
            className="text-center h-7 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
          <span className="ml-2">{likes}</span>
        </a>
      ) : (
        <a
          className="w-12 group flex items-center text-gray-500 mr-2 text-base leading-6 font-medium rounded-full"
          target="_blank"
          onClick={handleLike}
        >
          <svg
            className="text-center h-7 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
          <span className="ml-2">{likes}</span>
        </a>
      )}
    </div>
  );
};

export default LikeButton;
