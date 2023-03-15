import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FeedScreen from "../Components/Screens/FeedScreen";
import SearchScreen from "../Components/Screens/SearchScreen";

import Labels from "./Labels";

function SearchScreenNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={Labels.FEEDS_SCREEN} component={FeedScreen} />
      <Stack.Screen name={Labels.SEARCH_SCREEN} component={SearchScreen} />
    </Stack.Navigator>
  );
}

export default SearchScreenNavigator;
