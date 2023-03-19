import { StyleSheet, Image, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Button from "../Common/Button";
import { colors } from "../../Util";
import useDynamicColors from "../../Hooks/useDynamicColors";
import Text from "../Common/Text";

function GetStartedScreen() {
  const navigation = useNavigation();
  const { background } = useDynamicColors();
  return (
    <View style={[styles.container, background]}>
      <Text style={styles.title}>Stay Connected</Text>
      <Image
        source={require("../../../assets/get-started.png")}
        resizeMode="contain"
        style={styles.backgroundImage}
      />
      <Button
        onPress={() => navigation.navigate("Login")}
        style={styles.button}
      >
        Get Started
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  backgroundImage: {
    width: "100%",
    height: 375,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.secondary,
  },
  button: {
    marginHorizontal: 20,
  },
});

export default GetStartedScreen;
