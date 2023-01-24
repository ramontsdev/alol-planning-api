import { mappingDocument } from "@/helpers/mapping-document-mongo";
import { UserModel } from "@/models/user";
import { UserResponse } from "./create-user";

export async function findById(id: string) {
  const user = await UserModel.findById(id)

  if (!user) {
    return;
  }

  return mappingDocument<UserResponse>(user)
}
