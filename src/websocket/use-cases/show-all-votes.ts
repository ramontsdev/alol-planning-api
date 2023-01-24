import { io } from "@/index";
import { findPlanningPokerRoomByRoomId } from "../helpers/finder-helpers";

type Args = {
  showVotes: boolean,
  roomId: string;
}
export function showAllVotes({ showVotes, roomId }: Args) {
  const { room } = findPlanningPokerRoomByRoomId(roomId)

  if (!room) {
    console.log("Sala inválida")
    return
  }

  const totalSumVotes = room.users.reduce(
    (previousValue, currentValue) => {
      return (
        typeof currentValue.pokerRoom.vote === 'number'
          ? previousValue + currentValue.pokerRoom.vote
          : previousValue
      )
    },
    0
  );

  const usersVoted = room.users.filter(user => typeof user.pokerRoom.vote === 'number')

  const arithmeticAverage = totalSumVotes / usersVoted.length

  Number(arithmeticAverage.toFixed(2))

  io.in(roomId).emit('show_all_votes', {
    showVotes,
    arithmeticAverage: Number(arithmeticAverage.toFixed(2))
  })
}
