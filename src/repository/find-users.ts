import { mappingDocument } from "@/helpers/mapping-document-mongo";
import { UserModel } from "@/models/user";
import { UserResponse } from "./create-user";

export async function findUsers() {
  const users = await UserModel.find()

  return users.map(mappingDocument<UserResponse>)
}
