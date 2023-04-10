import React from "react";
import "react-toastify/dist/ReactToastify.css";

import LeftBar from "@/components/LeftBar";
import RightBar from "@/components/RightBar";
import HomePage from "@/components/HomePage";

export default function () {
  return (
    <div className="flex">
      <LeftBar />
      <main className="w-6/12">
        <HomePage/>
      </main>
      <RightBar />
    </div>
  );
}
