import React, { useEffect, useState } from "react";
import Fox from "@/components/Fox";
import { betterFetch } from "@/utils/utils";
import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const { username } = router.query;
  const [loggedInUser, setLoggedInUser] = useState("")

  const fetchProfile = async () => {
    try {
      const response = await betterFetch(`/api/profile/${username}`);
      setProfile(response);
      getFollowingStatus(response.user.id)
    } catch (e) {
      console.log(e);
    }
  };

  const toggleFollowing = async () => {
    try {
      const response = await betterFetch(`/api/following/${profile.user.id}`, {
        method: "POST",
      });
      getFollowingStatus(profile.user.id)
    } catch (e) {
      console.log(e);
    }
  };

  const getFollowingStatus = async (profileId: number) => {
    try {
      const response = await betterFetch(`/api/following/${profileId}`, {
        method: "GET",
      });
      if(response.status)
        setIsFollowing(true)
      else
        setIsFollowing(false)
    } catch (e) {
      console.log(e);
    }
  }

  const onDeleteFox = (id: number) => {
    fetchProfile();
  };

  const getCookieValue = (name: string): string =>
    document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";

  const getLoggedInUser = () => {
    setLoggedInUser(getCookieValue("loggedInUser"))
  }

  useEffect(() => {
    if (!username) {
      return;
    }
    getLoggedInUser();
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
          {
            loggedInUser != profile.user.id ?
              (
                isFollowing ?
                  (
                    <button
                      className="bg-red-400 hover:bg-red-600 hover:text-white py-2 px-4 m-5 rounded-full"
                      onClick={toggleFollowing}
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      className="bg-blue-400 hover:bg-blue-600 hover:text-white py-2 px-4 m-5 rounded-full"
                      onClick={toggleFollowing}
                    >
                      Follow
                    </button>
                  ))
              :
              <></>
          }

        </div>
      </div >
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

