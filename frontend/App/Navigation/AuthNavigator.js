import { createNativeStackNavigator } from "@react-navigation/native-stack";

import GetStartedScreen from "../Components/Screens/GetStartedScreen";
import LoginScreen from "../Components/Screens/LoginScreen";
import RegisterScreen from "../Components/Screens/RegisterScreen";
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
      <Stack.Screen name={Labels.REGISTER_SCREEN} component={RegisterScreen} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
