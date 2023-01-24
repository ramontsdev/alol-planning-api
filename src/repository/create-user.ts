import { mappingDocument } from "@/helpers/mapping-document-mongo";
import { UserModel } from "@/models/user";

type UserRequest = {
  name: string;
  username: string;
  email?: string;
  password: string;
}
export type UserResponse = UserRequest & {
  id: string;
}
export async function createUser({ name, username, email, password }: UserRequest) {
  const userCreated = await UserModel.create({ name, username, email, password })

  return mappingDocument<UserResponse>(userCreated)
}
