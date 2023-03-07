import { Router, useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

function singleRoom() {
  const router = useRouter();
  const roomId = router.query.roomId;
  
  return (
    <div>
      <h1>details about room {roomId}</h1>

      <h1>message</h1>
      <h1>create message</h1>
      <h1>delete message</h1>
    </div>
  );
}

export default singleRoom;
