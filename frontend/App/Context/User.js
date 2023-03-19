import { createContext, useContext, useState } from "react";

const UserContext = createContext();

UserContext.displayName = "User";

export const useUser = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: null,
    password: null,
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
