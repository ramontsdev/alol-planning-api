import { findUsers } from "@/repository/find-users";
import { Request, Response } from "express";

export async function findAllUsersController(request: Request, response: Response) {
  const users = await findUsers()

  return response.json(users)
}
