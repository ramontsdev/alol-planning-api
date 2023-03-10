import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

import { findByUsername } from "@/repository/find-by-username";

export async function signInController(request: Request, response: Response) {
  const requiredFields = ['username', 'password']

  for (const field of requiredFields) {
    if (!request.body[field]) {
      return response.status(400).json({ error: `${field} é obrigatório.` })
    }
  }

  const { username, password } = request.body
  const user = await findByUsername(username)

  if (!user) {
    return response.status(404).json({ error: 'Usuário não encontrado' })
  }

  if (user.password !== password) {
    return response.status(400).json({ error: 'A senha está incorreta' })
  }

  const token = jwt.sign({ id: user.id }, 'secretaria', {
    expiresIn: 60 * 60 * 48 // 48 horas
  })

  const userData = {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
  }

  return response.json({ token, userData })
}
