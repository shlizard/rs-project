import { useContext } from "react";
import { userContext } from "../contexts/userContext";

export default function useUser() {
  const { user, login, logout } = useContext(userContext);

  return { user, login, logout };
}
