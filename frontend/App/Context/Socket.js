import { useContext, createContext, useEffect, useState } from "react";
import io from "socket.io-client";

import { useUser } from "./User";
import { BACKEND_URL } from "../Services/Http";

export const SocketContext = createContext();

SocketContext.displayName = "Socket";

export const useSocket = () => useContext(SocketContext);

export function SocketContextProvider({ children }) {
  const [socket, setSocket] = useState();
  const { user } = useUser();
  useEffect(() => {
    console.log("re connecting socket for", user?.email);
    if (!user || !user.email) return;

    const newSocket = io(BACKEND_URL, {
      query: { email: user.email },
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export default SocketContext;
