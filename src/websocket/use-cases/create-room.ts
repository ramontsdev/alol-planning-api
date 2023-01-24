import { Socket } from "socket.io";

import { io } from "@/index";
import { findOnlineUserById } from "../helpers/finder-helpers";
import { OnlineUser } from "../types/online-user";
import { uid } from "../utils/uid";
import { onlineUsers, planningPokerRooms } from "../websocket";

export function createRoom(socket: Socket, data: any) {
  const { roomName, adminUser } = data
  const roomCode = (Math.random() + 1).toString(36).substring(7);
  const roomId = uid()

  const { onlineUser, indexOnlineUser } = findOnlineUserById(adminUser.id)

  if (!onlineUser) {
    console.log("Usuário não encontrado")
    return;
  }

  const updatedOnlineUser: OnlineUser = {
    ...onlineUser,
    pokerRoom: {
      roomId: roomId,
      vote: null
    }
  }

  onlineUsers.splice(indexOnlineUser, 1, updatedOnlineUser)

  adminUser.socketId = onlineUser.socketId
  adminUser.roomId = roomId
  adminUser.pokerRoom = onlineUsers[indexOnlineUser].pokerRoom

  const users: Array<OnlineUser> = [adminUser]

  const planningPokerRoom = {
    roomId,
    roomCode,
    roomName,
    adminUser,
    users
  }

  planningPokerRooms.push(planningPokerRoom)

  socket.join(roomId)

  io.in(roomId).emit('planning_poker_room', planningPokerRoom)
}
