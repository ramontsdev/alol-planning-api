import { mappingDocument } from "@/helpers/mapping-document-mongo";
import { UserModel } from "@/models/user";
import { UserResponse } from "./create-user";

export async function findByEmail(email: string) {
  const user = await UserModel.findOne({ email })

  if (!user) {
    return;
  }

  return mappingDocument<UserResponse>(user)
}
