import { Image, StyleSheet, View } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { useUser } from "../../Context/User";
import useDynamicColors from "../../Hooks/useDynamicColors";
import { colors } from "../../Util";
import * as SecureStorage from "expo-secure-store";
import Button from "../Common/Button";
import Touchable from "../Common/Touchable";
import Text from "../Common/Text";
import Input from "../Common/Input";
import Backend from "../../Services/Backend";
import Labels from "../../Navigation/Labels";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();
  const { background } = useDynamicColors();
  const navigation = useNavigation();
  const handleLogin = async () => {
    const response = await Backend.login(email, password);
    if (response instanceof Error) return alert(response.message);
    console.log(response.token);
    if (response.token)
      await SecureStorage.setItemAsync("token", response.token);
    setUser(response.data);
  };
  return (
    <View style={[styles.container, background]}>
      <Image
        source={require("../../../assets/login.png")}
        resizeMode="contain"
        style={styles.backgroundImage}
      />
      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button onPress={handleLogin}>Login</Button>
      <Text style={styles.redirectText}>
        Don't have an account
        <Touchable
          noFeedback
          onPress={() => navigation.replace(Labels.REGISTER_SCREEN)}
        >
          <Text style={styles.redirectLink}>&nbsp;Register</Text>
        </Touchable>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
    marginBottom: 15,
  },
  backgroundImage: {
    width: "100%",
    height: 320,
  },
  redirectText: {
    color: colors.grey,
    textAlign: "center",
    padding: 10,
    marginTop: 20,
  },
  redirectLink: {
    color: colors.secondary,
  },
});

export default LoginScreen;
