import { findById } from "@/repository/find-by-id";
import { Request, Response } from "express";

export async function findUser(request: Request, response: Response) {
  const { userId } = request.params
  const user = await findById(userId)

  if (!user) {
    return response.status(404).json({ error: 'Usuário não encontrado' })
  }

  return response.json(user)
}
