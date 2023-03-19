import { View, StyleSheet } from "react-native";
import React from "react";
import Touchable from "./Touchable";
import { colors } from "../../Util";
import Text from "./Text";

const Button = ({ children, onPress, style }) => {
  return (
    <Touchable onPress={onPress}>
      <View style={[styles.button, style]}>
        <Text>{children}</Text>
      </View>
    </Touchable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
