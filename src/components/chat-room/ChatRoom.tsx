import { FC, ReactElement, useEffect, useState } from "react";
import io from "socket.io-client";
import { getRandomInt } from "../../helpers/helpers";
import UserDraggable from "../user-draggable/UserDraggable";
import envs from "../../env/environment";
import MessageForm from "../message-form/MessageForm";

export interface User {
  idx: string;
  name: string;
  roomName: string;
  lastKnownPosition: { x: number; y: number };
  message: string;
}

const socket = io(envs.WS_HOST, {
  upgrade: false,
  transports: ["websocket"],
});

const ChatRoom: FC = (): ReactElement<HTMLDivElement> => {
  const [usersState, setUsers] = useState<User[]>([]);

  const handleStop = (
    e: MouseEvent,
    data: { lastX: number; lastY: number }
  ) => {
    socket.emit("change-user-position", { x: data.lastX, y: data.lastY });
  };

  const handleSendMessage = (message: string) => {
    socket.emit("send-message", { message });
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const name = urlParams.get("name");
    const roomName = urlParams.get("roomName");

    if (name && roomName) {
      const lastKnownPosition: { x: number; y: number } = {
        x: getRandomInt(0, 1500),
        y: getRandomInt(0, 700),
      };

      //if the user enters as first time, we set a random position in the canvas, after that, we will keep of the movement state.

      socket.emit(
        "join-room",
        {
          name,
          roomName,
          lastKnownPosition,
          message: "",
        },
        (users?: User[], error?: string) => {
          if (error) console.log(error);

          if (users) setUsers([...users]);
        }
      );
    }

    socket.on("users-update", (usersPayload: { users: User[] }) => {
      setUsers([...usersPayload.users]);
    });

    return () => {
      socket.off("users-update");
    };
  }, []);

  return (
    <div>
      {usersState ? (
        <UserDraggable handleStop={handleStop} users={usersState} />
      ) : null}
      <MessageForm sendMessageHandler={handleSendMessage} />
    </div>
  );
};

export default ChatRoom;
