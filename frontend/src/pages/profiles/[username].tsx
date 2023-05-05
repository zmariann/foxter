import React, { useEffect, useState } from "react";
import Fox from "@/components/Fox";
import { betterFetch } from "@/utils/utils";
import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const { username } = router.query;
  const fetchProfile = async () => {
    try {
      const response = await betterFetch(`/api/profile/${username}`);
      setProfile(response);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
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
          <button className="bg-green-400 hover:bg-green-500 hover:text-whiteFox py-2 px-4 p-3 rounded-full">
            Message
          </button>
          <button className="bg-blue-400 hover:bg-blue-600 hover:text-whiteFox py-2 px-4 m-5 rounded-full">
            Follow
          </button>
        </div>
      </div>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-10">
        {profile.foxes.map((fox: any) => (
          <Fox key={fox.id} fox={fox} />
        ))}
      </div>
    </>
  ) : (
    <p>User not found</p>
  );
};

export default Profile;
