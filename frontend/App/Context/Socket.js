import { useContext, createContext, useEffect, useState } from "react";
import io from "socket.io-client";

import { useUser } from "./User";

export const SocketContext = createContext();

SocketContext.displayName = "Socket";

export const useSocket = () => useContext(SocketContext);

export function SocketContextProvider({ children }) {
  const [socket, setSocket] = useState();
  const { user } = useUser();

  useEffect(() => {
    console.log("SocketContextProvider useEffect");
    if (!user.email || !user.password) return;

    const backend_url = process.env.STAY_CONNECT_BACKEND_URL;
    if (!backend_url) throw new Error("No backend url");

    const newSocket = io(backend_url, {
      query: { email: user.email, password: user.password },
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, [user.email, user.password]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export default SocketContext;
