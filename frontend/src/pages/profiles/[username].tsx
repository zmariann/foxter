import React, { useEffect, useState } from "react";
import Fox from "@/components/Fox";
import { betterFetch } from "@/utils/utils";
import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const { username } = router.query;

  const fetchProfile = async () => {
    try {
      const response = await betterFetch(`/api/profile/${username}`);
      setProfile(response);
      setIsFollowing(response.isFollowing);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  const handleFollow = async () => {
    try {
      const response = await betterFetch(`/api/follow/${profile.user.id}`, {
        method: "POST",
      });
      setIsFollowing(true);
    } catch (e) {
      console.log(e);
    }
  };

  const handleUnfollow = async () => {
    try {
      const response = await betterFetch(`/api/unfollow/${profile.user.id}`, {
        method: "POST",
      });
      setIsFollowing(false);
    } catch (e) {
      console.log(e);
    }
  };

  const onDeleteFox = (id: number) => {
    fetchProfile();
  };

  useEffect(() => {
    if (!username) {
      return;
    }
    fetchProfile();
  }, [username]);

  const defaultProfileImage = "/NoProfilePicture.png";

  return profile ? (
    <>
      {/* <SideMenu /> */}
      <div className="py-8 px-8 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
        <img
          className="block mx-auto h-24 rounded-full sm:mx-0 sm:flex-shrink-0"
          src={profile.user.profile_image_url || defaultProfileImage}
          alt={profile.user.name}
          style={{ borderRadius: "50%" }}
        />
        <div>
          <h2 className="pb-4">{profile.user.name}</h2>
          {isFollowing ? (
            <button
              className="bg-red-400 hover:bg-red-600 hover:text-white py-2 px-4 m-5 rounded-full"
              onClick={handleUnfollow}
            >
              Unfollow
            </button>
          ) : (
            <button
              className="bg-blue-400 hover:bg-blue-600 hover:text-white py-2 px-4 m-5 rounded-full"
              onClick={handleFollow}
            >
              Follow
            </button>
          )}
        </div>
      </div>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-10">
        {profile.foxes.map((fox: any) => (
          <Fox key={fox.id} fox={fox} onDeleteFox={onDeleteFox} />
        ))}
      </div>
    </>
  ) : (
    <p>User not found</p>
  );
};

export default Profile;

