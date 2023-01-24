import { io } from "@/index";
import { Socket } from "socket.io";
import { findOnlineUserById, findPlanningPokerRoomByRoomId } from "../helpers/finder-helpers";
import { OnlineUser } from "../types/online-user";

import { onlineUsers, planningPokerRooms } from "../websocket";

export function removeOnlineUser(socket: Socket) {
  const idx = onlineUsers.findIndex(user => user.socketId === socket.id)

  console.log(`${socket.id} saiu!`)

  const onlineUser = onlineUsers[idx]

  console.log(`${onlineUser?.name} saiu!\n`)

  if (!onlineUser) {
    console.log("Usuário sem login")
    return;
  }

  if (onlineUser.pokerRoom.roomId) {
    removeUserOfRoom(socket, onlineUser, onlineUser.pokerRoom.roomId)
  }

  onlineUsers.splice(idx, 1)
}

export function removeUserOfRoom(socket: Socket, onlineUser: OnlineUser, roomId: string) {
  const { room, roomIndex } = findPlanningPokerRoomByRoomId(roomId)

  if (!room) {
    console.log("Sala inválida")
    return;
  }

  const roomUserIndex = room.users.findIndex(user => user.id === onlineUser.id)

  room?.users.splice(roomUserIndex, 1) // remove o usuário de dentro da room

  planningPokerRooms.splice(roomIndex, 1, room) // atualiza no array de rooms

  if (room.adminUser.id === onlineUser.id) {
    room.adminUser = room.users[0] // atribuí um novo admin para a sala
  }

  refreshOnlineUsers({
    ...onlineUser,
    pokerRoom: {
      roomId: '',
      vote: null
    }
  })

  socket.leave(roomId) // sai da sala

  io.to(onlineUser.socketId).emit('planning_poker_room', {}) // zerar a Poker Room do que saiu da sala
  io.in(roomId).emit('planning_poker_room', planningPokerRooms[roomIndex])

  if (room?.users.length === 0) {
    planningPokerRooms.splice(roomIndex, 1) // remove room do array de rooms
  }
}

function refreshOnlineUsers(user: OnlineUser) {
  const { indexOnlineUser } = findOnlineUserById(user.id)

  onlineUsers[indexOnlineUser] = user
}

/* const { room, roomIndex } = findPlanningPokerRoomByRoomId(onlineUser.pokerRoom.roomId)

const roomUserIndex = room!.users.findIndex(user => user.id === onlineUser.id)

room?.users.splice(roomUserIndex, 1) // remove o usuário de dentro da room

planningPokerRooms.splice(roomIndex, 1, room!) // atualiza no array de rooms

io.in(onlineUser.pokerRoom.roomId).emit('planning_poker_room', planningPokerRooms[roomIndex])

if (room?.users.length === 0) {
  planningPokerRooms.splice(roomIndex, 1) // remove room do array de rooms
} */
