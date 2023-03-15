import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SendInvitations: React.FC = () => {
  interface Users {
    id: number;
    name: string;
  }

  const router = useRouter();

  // get users
  const [users, setUsers] = useState<Users[]>([]);
  // get user id
  const [invitedUserId, setinvitedUserId] = useState(0);

  const optionHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setinvitedUserId(0);
    const selectedIndex = event.target.options.selectedIndex;
    const content =
      event.target.options[selectedIndex].getAttribute("data-key");
    if (content !== null) {
      //console.log("OPTION", event.target.options[selectedIndex].getAttribute("data-key"));
      const result: number = parseInt(content);
      setinvitedUserId(result);
    }
  };

  const { roomId } = router.query;

  const dataFetch = async () => {
    const data = await (await fetch(`/api/invitations/users`)).json();
    setUsers(data);
    console.log(data);
  };

  useEffect(() => {
    dataFetch();
  }, []);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (invitedUserId === 0) {
      toast.warn("Choose a user!");
    } else {
      try {
        const response = await fetch(
          `/api/invitations/${router.query.roomId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ invitedUserId }),
          }
        );
        if (response.status === 400) {
          toast.error((await response.json()).error);
        } else {
          toast.success("Invitation has been successfully sent");
        }
      } catch (error: any) {
        toast.error(JSON.stringify(error));
      }
    }
  };

  return (
    <div>
      <ToastContainer position="top-center" limit={1} autoClose={1000} />
      <h1>invitation room id {roomId}</h1>

      <select onChange={optionHandler}>
        <option>Please choose one option</option>
        {users.map((user) => (
          <option data-key={user.id}>{user.name}</option>
        ))}
      </select>

      <button onClick={handleSubmit}>Send</button>
    </div>
  );
};

export default SendInvitations;
