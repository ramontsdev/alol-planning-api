import { Socket } from "socket.io";

import { io } from "@/index";
import { findOnlineUserById, findPlanningPokerRoomByRoomCode } from "../helpers/finder-helpers";
import { onlineUsers, planningPokerRooms } from "../websocket";

export function joinRoom(socket: Socket, data: any) {
  const { currentUser, roomCode } = data

  const userFound = findOnlineUserById(currentUser.id)

  if (!userFound.onlineUser) {
    console.log("Usuário não encontrado")
    return;
  }

  const { room, roomIndex } = findPlanningPokerRoomByRoomCode(roomCode)

  if (!room) {
    console.log("Sala não encontrada")
    return;
  }

  if (userFound.onlineUser.pokerRoom.roomId === room.roomId) {
    console.log(`${userFound.onlineUser?.username} já está na sala`)
    return;
  }

  userFound.onlineUser.pokerRoom = { roomId: room.roomId, vote: null }

  onlineUsers.splice(userFound.indexOnlineUser, 1, userFound.onlineUser)

  planningPokerRooms[roomIndex].users.push(userFound.onlineUser)

  socket.join(room.roomId)

  io.in(room.roomId).emit('planning_poker_room', planningPokerRooms[roomIndex])
}
