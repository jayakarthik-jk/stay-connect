import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";

import { useRoute } from "../Context/Route";
import { useUser } from "../Context/User";
import AppTabNavigator from "./AppTabNavigator";
import AuthNavigator from "./AuthNavigator";

function Navigation() {
  const ref = createNavigationContainerRef();
  const { setRouteName } = useRoute();
  const { user } = useUser();

  return (
    <NavigationContainer
      ref={ref}
      onReady={() => {
        setRouteName(ref.getCurrentRoute().name);
      }}
      onStateChange={async () => {
        const currentRouteName = ref.getCurrentRoute().name;
        setRouteName(currentRouteName);
      }}
    >
      {user && user.email ? <AppTabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default Navigation;
