import { Socket } from "socket.io";
import { userHandler } from "..";

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
