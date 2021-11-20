import WebSocket from "ws";
import type { Server } from "http";

let wss: WebSocket.Server;

const start = (server: Server) => (wss = new WebSocket.Server({ server }));
const send = (message: string) => wss.clients.forEach((client) => client.send(message));

export { start, send };
