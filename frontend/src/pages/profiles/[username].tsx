import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import SideMenu from "../../components/LeftBar"; // Import the SideMenu component
import { betterFetch } from "@/utils/utils";
import Fox from "@/components/Fox";
const API_URL = process.env.API_URL || 'http://localhost:5000'

const Profile = ({ user, foxes }) => {

  if (!user) {
    return <div>User not found</div>;
  }

  const defaultProfileImage = "/NoProfilePicture.png"

  return (
    <>
      {/* <SideMenu /> */}
      <div className="py-8 px-8 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">

        <img className="block mx-auto h-24 rounded-full sm:mx-0 sm:flex-shrink-0"
          src={ user.profile_image_url || defaultProfileImage}
          alt={user.name}
          style={{ borderRadius: "50%" }}
        />
        <div>
          <h2 className="pb-4">{user.name}</h2>
          <button className="bg-green-400 hover:bg-green-500 hover:text-whiteFox py-2 px-4 p-3 rounded-full">Message</button>
          <button className="bg-blue-400 hover:bg-blue-600 hover:text-whiteFox py-2 px-4 m-5 rounded-full">Follow</button>
        </div>
      </div>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-10">
        {foxes.map((fox:any) => (
          <Fox key={fox.id} fox={fox} /> 
        ))}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.query;
  const res = await fetch(`${API_URL}/api/profile/${username}`);
  if (res.status === 404) {
    return {
      notFound: true,
    };
  }

  const data = await res.json();
  

  return {
    props: {
      user: data.user,
      foxes: data.foxes,
    },
  };
};

export default Profile;
