import { StyleSheet, TextInput } from "react-native";
import React from "react";
import useDynamicColors from "../../Hooks/useDynamicColors";
import { colors } from "../../Util";

const Input = ({ style, ...props }) => {
  const { font } = useDynamicColors();
  return (
    <TextInput
      placeholderTextColor={font.color}
      style={[styles.input, font, style]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
    marginBottom: 15,
  },
});

export default Input;
