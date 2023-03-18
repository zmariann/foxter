import { useState } from "react";

interface Props {
  foxId: number;
  initialLikes: number;
}

const LikeButton: React.FC<Props> = ({ foxId, initialLikes }) => {
  const [likes, setLikes] = useState<number>(initialLikes);
  const [liked, setLiked] = useState<boolean>(false);

  const isUserLikedFox = async () => {
    try {
      const response = await fetch(`/api/fox_likes/${foxId}/likeStatus"`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data.status) {
        setLiked(true);
      } else setLiked(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/fox_likes/${foxId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setLikes(data.count);
      setLiked(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnlike = async () => {
    try {
      const response = await fetch(`/api/fox_likes/${foxId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setLikes(data.count);
      setLiked(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {liked ? (
        <button onClick={handleUnlike}>Unlike</button>
      ) : (
        <button onClick={handleLike}>Like</button>
      )}
      <span>{likes}</span>
    </div>
  );
};

export default LikeButton;
