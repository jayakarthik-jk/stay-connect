import { useState } from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";
import { useUser } from "../../Context/User";
import useDynamicColors from "../../Hooks/useDynamicColors";
import { colors } from "../../Util";
import Button from "../Common/Button";

function LoginScreen() {
  const [username, setUsername] = useState("");
  const [number, setNumber] = useState("");
  const { user, setUser } = useUser();
  const { background, font } = useDynamicColors();
  const handleLogin = () => {
    setUser({ username, number });
  };
  return (
    <View style={[styles.container, background]}>
      <Image
        source={require("../../../assets/login.png")}
        resizeMode="contain"
        style={styles.backgroundImage}
      />
      <TextInput
        placeholder="Username"
        placeholderTextColor={font.color}
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholderTextColor={font.color}
        placeholder="Mobile Number"
        value={number}
        onChangeText={setNumber}
        style={styles.input}
      />
      <Button onPress={handleLogin}>Login</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: colors.white,
  },
  input: {
    height: 40,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
    marginBottom: 20,
  },
  backgroundImage: {
    width: "100%",
    height: 320,
  },
});

export default LoginScreen;
