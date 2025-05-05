// import { Server } from "socket.io";
// import {socketServer} from "../../api/index.js";
//
// const io = new Server(socketServer, {
//     cors: {
//         origin: "*",
//         methods: ["GET", "POST"]
//     }
// });
//
// export const SocketServerConnection = () => {
//     io.on("connection", (socket) => {
//         console.log("Client connected:", socket.id);
//     })
//
//     io.emit("alertMatched" );
// }