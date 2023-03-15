import { createContext, useState, useContext } from "react";

const RouteContext = createContext();

RouteContext.displayName = "Route";

export const useRoute = () => useContext(RouteContext);


export const RouteContextProvider = ({ children }) => {
  const [routeName, setRouteName] = useState();

  return (
    <RouteContext.Provider value={{ routeName, setRouteName }}>
      {children}
    </RouteContext.Provider>
  );
};

export default RouteContext;
