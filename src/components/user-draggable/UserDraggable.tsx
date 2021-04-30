import { FC, ReactElement, useEffect, useState, memo } from "react";
import Draggable from "react-draggable";
import {
  DistanceConstrains,
  RatioVisibilityDistance,
} from "../../constants/ratioVisibilityDistance";
import {
  cleanWhiteSpacesInString,
  getClosestVisibleElementsSortedByDistance,
  noop,
} from "../../helpers/helpers";
import { User } from "../chat-room/ChatRoom";
import UserContent from "../user-content/UserContent";

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

    getClosestVisibleElementsSortedByDistance(
      cleanWhiteSpacesInString(actualName)
    ).forEach((element) => {
      const elementFound = document.getElementById(
        `${element.elementId}-message`
      );

      if (element.distance > DistanceConstrains.NEAR) {
        elementFound.setAttribute(
          "style",
          `opacity: ${RatioVisibilityDistance.NEAR}`
        );
      }

      if (element.distance > DistanceConstrains.MEDIUM) {
        elementFound.setAttribute(
          "style",
          `opacity: ${RatioVisibilityDistance.MEDIUM}`
        );
      }

      if (element.distance > DistanceConstrains.FAR) {
        elementFound.setAttribute(
          "style",
          `opacity: ${RatioVisibilityDistance.FAR}`
        );
      }

      if (element.distance > DistanceConstrains.NO_VISIBLE) {
        elementFound.setAttribute(
          "style",
          `opacity: ${RatioVisibilityDistance.NO_VISIBLE}; display: none;`
        );
      }
    });
  }, [users]);

  return (
    <section>
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
            <div
              style={{ cursor: actualName === user.name ? "pointer" : "auto" }}
            >
              <UserContent
                messageElementId={`selector-dragabble-${cleanWhiteSpacesInString(
                  user.name
                )}-message`}
                message={user.message}
                username={user.name}
              />
            </div>
          </div>
        </Draggable>
      ))}
    </section>
  );
};

export default memo(UserDraggable);
