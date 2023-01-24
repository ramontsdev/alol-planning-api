import { io } from "..";
import { findOnlineUserBySocketId, findPlanningPokerRoomByRoomId } from "./helpers/finder-helpers";
import { OnlineUser } from "./types/online-user";
import { PlanningPokerRoom } from "./types/planning-poker-room";
import { User } from "./types/user";
import { addOnlineUser } from "./use-cases/add-online-user";
import { createRoom } from "./use-cases/create-room";
import { handleConnect } from "./use-cases/handle-connect";
import { joinRoom } from "./use-cases/join-room";
import { removeOnlineUser, removeUserOfRoom } from "./use-cases/remove-online-user";
import { showAllVotes } from "./use-cases/show-all-votes";
import { throwVote } from "./use-cases/throw-vote";

export const onlineUsers: Array<OnlineUser> = []
export const planningPokerRooms: Array<PlanningPokerRoom> = []

export function websocketRun() {
  io.on('connect', socket => {
    handleConnect(socket)

    socket.on('connected', (data: User) => addOnlineUser(socket, data))

    socket.on('disconnect', () => removeOnlineUser(socket))

    socket.on('create_room', (data) => createRoom(socket, data))

    socket.on('join_room', (data) => joinRoom(socket, data))

    socket.on('throw_vote', (vote) => throwVote(socket, vote))

    socket.on('show_all_votes', showAllVotes)

    socket.on('clear_all_votes', (roomId) => {
      const { room, roomIndex } = findPlanningPokerRoomByRoomId(roomId)

      if (!room) {
        console.log("Sala inválida")
        return;
      }

      const users = room.users.map(user => {
        user.pokerRoom.vote = null
        return user
      })
      room.users = users

      planningPokerRooms.splice(roomIndex, 1, room)

      io.in(roomId).emit('planning_poker_room', room)
      io.in(roomId).emit('clean_votes')
    })

    socket.on('exit_poker_room', () => {
      const { onlineUser } = findOnlineUserBySocketId(socket.id)

      if (!onlineUser) {
        console.log("Usuário sem login. Pediu pra sair")
        return;
      }
      if (!onlineUser.pokerRoom.roomId) {
        console.log("Usuário não está em uma sala válida")
        return;
      }

      removeUserOfRoom(socket, onlineUser, onlineUser.pokerRoom.roomId)
    })

  })
}
