import axios from "axios";
import { userSchema } from "../interfaces/VlidationsSchema";

export async function createUser(user) {
  // const validationConfiguration = { abortEarly: false };
  // const [data, error] = await asyncHandler(userSchema.validate, { user, validationConfiguration });

  const account = await userSchema.validate(user, { abortEarly: false });

  return await axios.post("users/register/", { ...account });
}

export async function login(user) {
  const account = await userSchema.validate(user, {abortEarly: false});

  return await axios.post("users/login/", {...account});
}

export async function getUsers() {
  return await axios.get("users/");
}

export async function getUser() {
  return await axios.get("users/me/");
}
