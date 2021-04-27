import React, { FC, ReactElement, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { User } from "../chat-room/ChatRoom";

interface UserDraggableProps {
  users: User[];
  handleStop: (e: MouseEvent, data: Object) => void;
}

const UserDraggable: FC<UserDraggableProps> = ({
  users,
  handleStop,
}): ReactElement<HTMLDivElement> => {
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
