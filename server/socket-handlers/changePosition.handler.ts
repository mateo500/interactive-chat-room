import { Server, Socket } from "socket.io";
import { userHandler } from "../index";

export const changeUserPositionHandler = (socket: Socket, io: Server) => {
  socket.on("change-user-position", ({ x, y }: { x: number; y: number }) => {
    const user = userHandler.findRoomNameById(socket.id);

    userHandler.updateUserPosition(socket.id, x, y);

    io.to(user.roomName).emit("users-update", {
      users: userHandler.getUsersInRoom(user.roomName),
    });
  });
};
