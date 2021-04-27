import { FC, ReactElement, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import UserDraggable from "../user-draggable/UserDraggable";

export interface User {
  idx: string;
  name: string;
  roomName: string;
  lastKnownPosition?: { x: number; y: number };
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const ENDPOINT = "localhost:5000";
const socket: Socket<DefaultEventsMap, DefaultEventsMap> = io(ENDPOINT, {
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

  /* const getElements = () => {
    const mydiv = document.querySelector("#special-selector");
    console.log(mydiv);
  };

  useEffect(() => {
    getElements();
  }, []); */

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const name = urlParams.get("name");
    const roomName = urlParams.get("roomName");

    if (name && roomName) {
      const lastKnownPosition: { x: number; y: number } = {
        x: getRandomInt(0, window.innerWidth),
        y: getRandomInt(0, window.innerHeight),
      };

      socket.emit(
        "join-room",
        { name, roomName, lastKnownPosition },
        (users?: User[], error?: string) => {
          if (error) {
            console.log(error);
          }

          if (users) {
            setUsers([...users]);
          }
        }
      );
    }

    socket.on("users-update", (usersPayload: { users: User[] }) => {
      setUsers([...usersPayload.users]);
    });

    return () => {
      socket.off();
    };
  }, []);

  return usersState ? (
    <UserDraggable handleStop={handleStop} users={usersState} />
  ) : null;
};

export default ChatRoom;
