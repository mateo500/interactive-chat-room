import { Server, Socket } from "socket.io";
import { userHandler } from "../index";

export const sendMessageHandler = (socket: Socket, io: Server) => {
  socket.on("send-message", ({ message }) => {
    const user = userHandler.getUser(socket.id);

    userHandler.saveMessage(user.idx, message);

    io.to(user.roomName).emit("users-update", {
      users: userHandler.getUsersInRoom(user.roomName),
    });
  });
};
