import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SecureStorage from "expo-secure-store";
import { useUser } from "../../Context/User";
import useDynamicColors from "../../Hooks/useDynamicColors";
import { colors } from "../../Util";
import Backend from "../../Services/Backend";
import Button from "../Common/Button";
import Text from "../Common/Text";
import Touchable from "../Common/Touchable";
import Input from "../Common/Input";
import Labels from "../../Navigation/Labels";

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();
  const { background } = useDynamicColors();
  const navigation = useNavigation();
  const handleRegister = async () => {
    const response = await Backend.register(email, name, password);
    if (response instanceof Error) return alert(response.message);
    console.log(response.token);
    if (response.token)
      await SecureStorage.setItemAsync("token", response.token);
    setUser(response.data);
  };
  return (
    <View style={[styles.container, background]}>
      <Image
        source={require("../../../assets/register.png")}
        resizeMode="contain"
        style={styles.backgroundImage}
      />
      <Input placeholder="Name" value={name} onChangeText={setName} />
      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button onPress={handleRegister}>Register</Button>
      <Text style={styles.redirectText}>
        Already have an account
        <Touchable
          noFeedback
          onPress={() => navigation.replace(Labels.LOGIN_SCREEN)}
        >
          <Text style={styles.redirectLink}>&nbsp;Login</Text>
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

export default RegisterScreen;
