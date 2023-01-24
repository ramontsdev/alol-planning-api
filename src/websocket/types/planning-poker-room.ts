import { OnlineUser } from "./online-user";

export type PlanningPokerRoom = {
  roomId: string;
  roomCode: string;
  roomName: string;
  adminUser: OnlineUser,
  users: Array<OnlineUser>
}
