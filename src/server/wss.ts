
import WebSocket from 'ws';

let wss: WebSocket.Server;

const start = (port: number): void => {
    wss = new WebSocket.Server({port});
  };
  
  const send = (message: string): void => {
    wss.clients.forEach((client) => client.send(message));
  };

  export { 
      start,
      send
  }