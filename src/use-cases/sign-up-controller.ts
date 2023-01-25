import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

import { createUser } from "@/repository/create-user";
import { findByEmail } from "@/repository/find-by-email";
import { findByUsername } from "@/repository/find-by-username";

export async function signUpController(request: Request, response: Response) {
  const requiredFields = ['name', 'username', 'password', 'confirmPassword']

  for (const field of requiredFields) {
    if (!request.body[field]) {
      return response.status(400).json({ error: `${field} é obrigatório.` })
    }
  }

  const { name, username, email, password } = request.body

  const usernameAlreadyExists = await findByUsername(username)
  if (usernameAlreadyExists) {
    return response.status(400).json({ error: 'Nome de usuário já em uso' })
  }

  const emailAlreadyExists = await findByEmail(email)
  if (emailAlreadyExists) {
    return response.status(400).json({ error: 'E-mail já em uso' })
  }

  const user = await createUser({ name, username, email, password })

  const token = jwt.sign({ id: user.id }, 'secretaria', {
    expiresIn: 60 * 60 * 48 // 48 horas
  })

  const userData = {
    ...user,
    password: undefined
  }

  response.json({ token, userData })
}
