import { mappingDocument } from "@/helpers/mapping-document-mongo";
import { UserModel } from "@/models/user";
import { UserResponse } from "./create-user";

export async function findByUsername(username: string) {
  const user = await UserModel.findOne({ username })

  if (!user) {
    return;
  }

  return mappingDocument<UserResponse>(user)
}
