import { useState } from "react";

interface Props {
  foxId: number;
  initialLikes: number;
  userId: number;
  likedByUser: boolean;
}

const LikeButton: React.FC<Props> = ({ foxId, initialLikes, userId, likedByUser }) => {
  const [likes, setLikes] = useState<number>(initialLikes);
  const [liked, setLiked] = useState<boolean>(likedByUser);

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/fox_likes/${foxId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }),
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
        body: JSON.stringify({ user_id: userId }),
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
