import { createContext, useContext } from "react";
import { useColorScheme } from "react-native";

const AppThemeContext = createContext("light");

AppThemeContext.displayName = "Theme";

export const useAppTheme = () => useContext(AppThemeContext);

export const AppThemeContextProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  return (
    <AppThemeContext.Provider value={colorScheme}>
      {children}
    </AppThemeContext.Provider>
  );
};

export default AppThemeContext;
