import React, { FC, ReactElement, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { User } from "../chat-room/ChatRoom";

interface UserDraggableProps {
  users: User[];
  handleStop: (e: MouseEvent, data: Object) => void;
}

function noop() {
  return;
}

const UserDraggable: FC<UserDraggableProps> = ({
  users,
  handleStop,
}): ReactElement<HTMLDivElement> => {
  const [actualName, setActualName] = useState<string>("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    setActualName(urlParams.get("name").trim().toLowerCase());
  }, []);

  return (
    <div>
      {users.map((user, index) => {
        return (
          <Draggable
            axis="both"
            handle=".handle"
            position={{
              x: user.lastKnownPosition.x,
              y: user.lastKnownPosition.y,
            }}
            grid={[10, 10]}
            scale={1}
            key={`${index || 0}-user-dragable`}
            onStop={handleStop}
            onStart={actualName === user.name ? noop : () => false}
          >
            <div className="handle" id="special-selector">
              {user?.name}
            </div>
          </Draggable>
        );
      })}
    </div>
  );
};

export default UserDraggable;
