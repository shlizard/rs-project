import { createContext, useState } from "react";

export const userContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  function login(userData) {
    setUser(userData);
  }

  function logout() {
    setUser(null);
  }

  return (
    <userContext.Provider value={{ user, login, logout }}>
      {children}
    </userContext.Provider>
  );
}
