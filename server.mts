import { createServer } from 'node:http';
import next from "next"
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "0.0.0.0";
const port = parseInt(process.env.PORT || "3002", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handle);
    const io = new Server(httpServer);
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        // socket.on("join-room", ({room, username}) => {
        //     socket.join(room);
        //     console.log(`User ${username} joined room ${room}`);
        //     socket.to(room).emit("user_joined",`${username} joined room`);
        // })

        socket.on("Patient", (patientData) => {
            console.log(`Patient Information from ${patientData.sender}`, patientData);
            io.emit("Patient", patientData);
        })

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
    

    httpServer.listen(port, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
})