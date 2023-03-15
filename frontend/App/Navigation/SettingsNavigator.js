import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../Components/Screens/ProfileScreen";
import SettingsScreen from "../Components/Screens/SettingsScreen";

import { colors } from "../Util";
import Labels from "./Labels";

function ChatScreenNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Labels.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Labels.SETTINGS_SCREEN}
        component={SettingsScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
        }}
      />
    </Stack.Navigator>
  );
}

export default ChatScreenNavigator;
