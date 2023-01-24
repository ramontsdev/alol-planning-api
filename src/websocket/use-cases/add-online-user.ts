import { Socket } from "socket.io";

import { OnlineUser } from "../types/online-user";
import { User } from "../types/user";
import { onlineUsers } from "../websocket";

export function addOnlineUser(socket: Socket, userData: User) {
  if (!userData.id) {
    return;
  }

  const onlineUser: OnlineUser = {
    ...userData,
    socketId: socket.id,
    pokerRoom: {
      vote: null
    },
  }

  onlineUsers.push(onlineUser)
}
