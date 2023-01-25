import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { findById } from "@/repository/find-by-id";

export async function authenticationController(request: Request, response: Response) {
  const headers = request.headers

  if (!headers.authorization) {
    return response.status(400).json({ error: 'Unauthorized' })
  }

  try {
    const validation = jwt.verify(headers.authorization, 'secretaria') as { id: string }

    const user = await findById(validation.id)

    if (!user) {
      return response.status(400).json({ error: 'Unauthorized' })
    }

    const userData = {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email
    }

    const token = jwt.sign({ id: userData?.id }, 'secretaria', {
      expiresIn: 60 * 60 * 48 // 48 horas
    })

    return response.json({ token, userData })

  } catch (error) {
    const err = error as Error
    console.log(err.message)
    return response.status(400).json({ error: 'Unauthorized' })
  }
}
