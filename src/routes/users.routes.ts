import { Router } from "express";

import { findAllUsers } from "@/use-cases/find-all-users";
import { findUser } from "@/use-cases/find-user";
import { signInController } from "@/use-cases/sign-in-controller";
import { signUpController } from "@/use-cases/sign-up-controller";


export const usersRoutes = Router();

usersRoutes.post('/users/sign-up', signUpController)
usersRoutes.post('/users/sign-in', signInController)
usersRoutes.get('/users', findAllUsers)
usersRoutes.get('/users/:userId', findUser)
