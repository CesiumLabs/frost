import WebSocket from "ws";
import type { Server } from "node:http";

let wss: WebSocket.Server;

const start = (server: Server): void => {
    wss = new WebSocket.Server({ server });
};

const send = (message: string): void => {
    wss.clients.forEach((client) => client.send(message));
};

export { start, send };
