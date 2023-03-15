import { AppThemeContextProvider } from "./AppTheme";
import { RouteContextProvider } from "./Route";
import { UserContextProvider } from "./User";

const Context = ({ children }) => {
  return (
    <UserContextProvider>
      <AppThemeContextProvider>
        <RouteContextProvider>
          {children}
        </RouteContextProvider>
      </AppThemeContextProvider>
    </UserContextProvider>
  );
};

export default Context;
