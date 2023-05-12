import { createContext, useContext, useEffect, useState } from "react";
import Backend from "../Services/Backend";

const UserContext = createContext();

UserContext.displayName = "User";

export const useUser = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: null,
    password: null,
  });
  useEffect(() => {
    async function fetchUser() {
      const status = await Backend.isloggedIn();
      console.log(status);
      if (status instanceof Error) return;
      if (!status.isLoggedIn) return;
      setUser(status.user);
    }
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
