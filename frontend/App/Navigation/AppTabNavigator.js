import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import ChatScreenNavigator from "./ChatScreenNavigator";
import SettingsNavigator from "./SettingsNavigator";
import { colors } from "../Util";
import { useRoute } from "../Context/Route";
import { useAppTheme } from "../Context/AppTheme";
import Labels from "./Labels";
import SearchScreenNavigator from "./SearchNavigator";

function AppTabNavigator() {
  const { routeName } = useRoute();
  const theme = useAppTheme();
  const Tab = createMaterialTopTabNavigator();
  const screenOptions = {
    tabBarActiveTintColor: colors.secondary,
    tabBarInactiveTintColor: theme === "dark" ? colors.white : colors.black,
    tabBarLabelStyle: {
      fontSize: 10,
    },
    headerShown: false,
    tabBarStyle: {
      width: "100%",
      alignSelf: "center",
      borderWidth: 2,
      borderColor: colors.secondary,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      elevation: 5,
      backgroundColor: colors.primary,
      opacity: 0.8,
      display:
        routeName === Labels.CHAT_SCREEN ||
        routeName === Labels.SETTINGS_SCREEN ||
        routeName === Labels.CONTACTLIST_SCREEN
          ? "none"
          : "flex",
      position: "absolute",
      bottom: -2,
      left: 0,
      right: 0,
      overflow: "hidden",
    },
    tabBarIndicatorStyle: {
      display: "none",
    },
    swipeEnabled: !(
      routeName === Labels.CHAT_SCREEN ||
      routeName === Labels.SETTINGS_SCREEN ||
      routeName === Labels.CONTACTLIST_SCREEN ||
      routeName === Labels.SEARCH_SCREEN
    ),
  };
  return (
    <Tab.Navigator screenOptions={screenOptions} tabBarPosition="bottom">
      <Tab.Screen
        name={Labels.CHATS_TAB}
        component={ChatScreenNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="chat" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={Labels.FEEDS_TAB}
        component={SearchScreenNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="article" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={Labels.PROFILE_TAB}
        component={SettingsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="account-circle" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default AppTabNavigator;
