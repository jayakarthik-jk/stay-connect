import { createNativeStackNavigator } from "@react-navigation/native-stack";

import GetStartedScreen from "../Components/Screens/GetStartedScreen";
import LoginScreen from "../Components/Screens/LoginScreen";
import Labels from "./Labels";

function AuthNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={Labels.GETSTARTED_SCREEN}
        component={GetStartedScreen}
      />
      <Stack.Screen name={Labels.LOGIN_SCREEN} component={LoginScreen} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
