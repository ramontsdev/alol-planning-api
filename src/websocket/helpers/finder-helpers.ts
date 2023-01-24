import { onlineUsers, planningPokerRooms } from "../websocket"

export function findOnlineUserBySocketId(socketId: string) {
  const onlineUser = onlineUsers.find(user => user.socketId === socketId)
  const indexOnlineUser = onlineUsers.findIndex(user => user.socketId === socketId)

  return {
    onlineUser,
    indexOnlineUser
  }
}
export function findOnlineUserById(id: string) {
  const onlineUser = onlineUsers.find(user => user.id === id)
  const indexOnlineUser = onlineUsers.findIndex(user => user.id === id)

  return {
    onlineUser,
    indexOnlineUser
  }
}
export function findPlanningPokerRoomByRoomCode(roomCode: string) {
  const room = planningPokerRooms.find((room) => room.roomCode === roomCode)
  const roomIndex = planningPokerRooms.findIndex((room) => room.roomCode === roomCode)

  return { room, roomIndex }
}
export function findPlanningPokerRoomByRoomId(roomId: string) {
  const room = planningPokerRooms.find((room) => room.roomId === roomId)
  const roomIndex = planningPokerRooms.findIndex((room) => room.roomId === roomId)

  return { room, roomIndex }
}
