import { User } from "./user";

export type OnlineUser = User & {
  socketId: string;
  pokerRoom: {
    roomId?: string
    vote: number | null
  }
}
