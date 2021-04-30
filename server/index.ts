import express, { Request, Response } from "express";
import next, { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import http from "http";
import { Server, Socket } from "socket.io";
import { UsersHandler } from "./users.handler";
import { changeUserPositionHandler } from "./socket-handlers/changePosition.handler";
import { deleteUserHandler } from "./socket-handlers/deleteUser.handler";
import { joinRoomHandler } from "./socket-handlers/joinRoom.handler";
import { sendMessageHandler } from "./socket-handlers/receiveMessage.handler";

export const userHandler = new UsersHandler();

const port: number = parseInt(process.env.PORT || "5000", 10);
const dev: boolean = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler: NextApiHandler = nextApp.getRequestHandler();

(async () => {
  try {
    await nextApp.prepare();
    const app = express();
    const serverHttp: http.Server = http.createServer(app);
    const io: Server = new Server();
    io.attach(serverHttp);

    io.on("connection", (socket: Socket) => {
      joinRoomHandler(socket);
      sendMessageHandler(socket, io);
      deleteUserHandler(socket);
      changeUserPositionHandler(socket, io);
    });

    app.all("*", (req: Request, res: Response) =>
      nextHandler(
        (req as unknown) as NextApiRequest,
        (res as unknown) as NextApiResponse
      )
    );

    serverHttp.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(
        `>Server Ready on localhost:${port} - env ${process.env.NODE_ENV}`
      );
    });
  } catch (e) {
    console.error(e);
  }
})();
