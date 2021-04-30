import { Socket } from "socket.io";
import { userHandler } from "..";
import { User } from "../users.handler";

export const joinRoomHandler = (socket: Socket) => {
  socket.on(
    "join-room",
    (
      { name, roomName, lastKnownPosition, message },
      callback: (users?: User[], error?: string) => void
    ) => {
      const { error, user } = userHandler.addUser({
        idx: socket.id,
        name,
        roomName,
        lastKnownPosition,
        message,
      });

      if (error) return callback(undefined, error);

      socket.join(user.roomName);

      socket.broadcast.to(user.roomName).emit("users-update", {
        users: userHandler.getUsersInRoom(user.roomName),
      });

      callback(userHandler.getUsersInRoom(user.roomName), undefined);
    }
  );
};
