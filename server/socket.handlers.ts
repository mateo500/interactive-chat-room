import { Server, Socket } from "socket.io";
import { UsersHandler, User } from "./users.handler";

const userHandler = new UsersHandler();

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

export const sendMessageHandler = (socket: Socket, io: Server) => {
  socket.on("send-message", (message) => {
    const user = userHandler.getUser(socket.id);
  });
};

export const deleteUserHandler = (socket: Socket) => {
  socket.on("disconnect", () => {
    const user = userHandler.findRoomNameById(socket.id);

    if (user?.roomName) {
      userHandler.removeUser(socket.id);
      socket.broadcast.to(user.roomName).emit("users-update", {
        users: userHandler.getUsersInRoom(user.roomName),
      });
    }
  });
};

export const changeUserPositionHandler = (socket: Socket, io: Server) => {
  socket.on("change-user-position", ({ x, y }: { x: number; y: number }) => {
    const user = userHandler.findRoomNameById(socket.id);

    userHandler.updateUserPosition(socket.id, x, y);

    io.to(user.roomName).emit("users-update", {
      users: userHandler.getUsersInRoom(user.roomName),
    });
  });
};
