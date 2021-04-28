import { FC, ReactElement, useEffect, useState, memo } from "react";
import Draggable from "react-draggable";
import {
  cleanWhiteSpacesInString,
  getClosestVisibleElementsSortedByDistance,
  noop,
} from "../../helpers/helpers";
import { User } from "../chat-room/ChatRoom";

interface UserDraggableProps {
  users: User[];
  handleStop: (e: MouseEvent, data: { lastX: number; lastY: number }) => void;
}

const UserDraggable: FC<UserDraggableProps> = ({
  users,
  handleStop,
}): ReactElement<HTMLDivElement> => {
  const [actualName, setActualName] = useState<string>("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    setActualName(urlParams.get("name").trim().toLowerCase());

    //missing visibility css implementation
    /* console.log(
      getClosestVisibleElementsSortedByDistance(cleanWhiteSpacesInString(actualName))
    ); */
  }, [users]);

  return (
    <div>
      {users.map((user, index) => (
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
          <div
            className="handle"
            id={`selector-dragabble-${cleanWhiteSpacesInString(user.name)}`}
          >
            {user?.name}
          </div>
        </Draggable>
      ))}
    </div>
  );
};

export default memo(UserDraggable);
