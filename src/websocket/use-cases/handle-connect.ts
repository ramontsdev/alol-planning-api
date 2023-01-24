import { Socket } from "socket.io";

export function handleConnect(socket: Socket) {
  console.log(`${socket.id} conectou!\n`)
}
