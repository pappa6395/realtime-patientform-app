"use strict";
import { createServer } from 'node:http';
import next from "next";
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
    const socketPatientMap = new Map();
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);
        socket.on("Patient", (patientData) => {
            console.log(`Patient Information from ${patientData.sender}`, patientData);
            // Map socket.id to patientId
            socketPatientMap.set(socket.id, patientData.patientId);
            io.emit("Patient", patientData);
        });
        socket.on('formStatus', ({ patientId, status }) => {
            console.log(`Patient ${patientId} is now ${status}`);
            // Ensure mapping exists
            socketPatientMap.set(socket.id, patientId);
            io.emit('updatedFormStatus', { patientId, status });
        });
        socket.on('disconnect', () => {
            const patientId = socketPatientMap.get(socket.id); // Get the patientId from the map
            console.log(`User disconnected: ${socket.id} (Patient ID: ${patientId})`);
            if (patientId) {
                io.emit('updatedFormStatus', { patientId, status: 'inactive' });
                socketPatientMap.delete(socket.id); // Clean up the mapping
            }
            else {
                console.log('No patientId found for this disconnected socket.');
            }
        });
    });
    httpServer.listen(port, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
});
