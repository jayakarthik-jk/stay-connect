import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ChatListScreen from "../Components/Screens/ChatListScreen";
import ChatScreen from "../Components/Screens/ChatScreen";
import ContactsScreen from "../Components/Screens/ContactsScreen";
import { colors } from "../Util";
import Labels from "./Labels";

function ChatScreenNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Labels.CHATLIST_SCREEN}
        component={ChatListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Labels.CONTACTLIST_SCREEN}
        component={ContactsScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.black,
        }}
      />
      <Stack.Screen
        name={Labels.CHAT_SCREEN}
        component={ChatScreen}
        options={({ route }) => ({
          title: route.params.name,
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.black,
        })}
      />
    </Stack.Navigator>
  );
}

export default ChatScreenNavigator;
