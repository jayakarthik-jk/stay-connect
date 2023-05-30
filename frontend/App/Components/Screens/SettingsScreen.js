import { View, StyleSheet } from "react-native";
import useDynamicColors from "../../Hooks/useDynamicColors";
import Text from "../Common/Text";
import Button from "../Common/Button";
import { useUser } from "../../Context/User";
import * as SecureStore from "expo-secure-store";

function SettingsScreen() {
  const { background } = useDynamicColors();
  const { setUser } = useUser();

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("token");
    setUser(null);
  };
  return (
    <View style={[background, styles.container]}>
      <Button style={styles.logoutBtn} onPress={handleLogout}>
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 30,
  },
  logoutBtn: {
    paddingHorizontal: 30,
  },
});

export default SettingsScreen;
