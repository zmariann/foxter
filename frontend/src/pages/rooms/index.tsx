import React, { useEffect, useState } from "react";
import {useRouter} from "next/router";

interface Rooms {
  name: string;
  id: number[];
}

const allRooms: React.FC = () => {
  const [rooms, setRooms] = useState<Rooms[]>([]);

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (await fetch("/api/rooms")).json();
      setRooms(data);
      console.log(data);
    };

    dataFetch();
  }, []);

    return (
        <div>
          <ul>
            {rooms.map((room) => {
              return <li><a href={"/rooms/" + room.id}>{room.name}</a></li>;
            })}
          </ul>
        </div>
  );
};

/*
  return (
    <div>
      <ul>
        {rooms.map((room) => {
          return <a href={"/rooms/" + room.id}>{room.name}</a>;
        })}
      </ul>
    </div>
  );
  */
 

export default allRooms;
