import { Socket } from "socket.io";

import { io } from "@/index";
import { findOnlineUserBySocketId, findPlanningPokerRoomByRoomId } from "../helpers/finder-helpers";
import { planningPokerRooms } from "../websocket";

export function throwVote(socket: Socket, vote: number | null) {
  const { onlineUser } = findOnlineUserBySocketId(socket.id)

  console.log(`${onlineUser?.name} VOTOU!`)

  if (!onlineUser) {
    console.log("Usuário não encontrado")
    return;
  }

  if (!onlineUser.pokerRoom.roomId) {
    console.log("Sala inválida\n")
    return;
  }

  const { room, roomIndex } = findPlanningPokerRoomByRoomId(onlineUser.pokerRoom.roomId)

  if (!room) {
    console.log("Sala não encontrada")
    return;
  }

  onlineUser.pokerRoom.vote = vote

  const roomUserIndex = room.users.findIndex(user => user.socketId === onlineUser.socketId)

  planningPokerRooms[roomIndex].users[roomUserIndex] = onlineUser

  io.in(onlineUser.pokerRoom.roomId).emit('planning_poker_room', planningPokerRooms[roomIndex])
}
