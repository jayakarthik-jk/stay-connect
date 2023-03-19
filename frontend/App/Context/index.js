import { AppThemeContextProvider } from "./AppTheme";
import { RouteContextProvider } from "./Route";
import { SocketContextProvider } from "./Socket";
import { UserContextProvider } from "./User";

const Context = ({ children }) => {
  return (
    <UserContextProvider>
      <SocketContextProvider>
        <AppThemeContextProvider>
          <RouteContextProvider>{children}</RouteContextProvider>
        </AppThemeContextProvider>
      </SocketContextProvider>
    </UserContextProvider>
  );
};

export default Context;
