import { Router } from "express";

import { authenticationController } from "@/use-cases/authentication-controller";
import { findAllUsersController } from "@/use-cases/find-all-users";
import { findUserController } from "@/use-cases/find-user";
import { signInController } from "@/use-cases/sign-in-controller";
import { signUpController } from "@/use-cases/sign-up-controller";


export const usersRoutes = Router();

usersRoutes.post('/users/sign-up', signUpController)
usersRoutes.post('/users/sign-in', signInController)
usersRoutes.get('/users/sign-in', authenticationController)
usersRoutes.get('/users', findAllUsersController)
usersRoutes.get('/users/:userId', findUserController)
