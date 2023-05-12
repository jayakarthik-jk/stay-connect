import { AppThemeContextProvider } from "./AppTheme";
import { ConversationsContextProvider } from "./Conversations";
import { RouteContextProvider } from "./Route";
import { SocketContextProvider } from "./Socket";
import { UserContextProvider } from "./User";

const Context = ({ children }) => {
  return (
    <UserContextProvider>
      <SocketContextProvider>
        <AppThemeContextProvider>
          <RouteContextProvider>
            <ConversationsContextProvider>
              {children}
            </ConversationsContextProvider>
          </RouteContextProvider>
        </AppThemeContextProvider>
      </SocketContextProvider>
    </UserContextProvider>
  );
};

export default Context;
