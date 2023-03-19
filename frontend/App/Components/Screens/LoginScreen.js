import { useState } from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";
import { useUser } from "../../Context/User";
import useDynamicColors from "../../Hooks/useDynamicColors";
import { colors } from "../../Util";
import Button from "../Common/Button";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();
  const { background, font } = useDynamicColors();
  const handleLogin = () => {
    // validate Input

    setUser({ email, password });
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
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholderTextColor={font.color}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
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
