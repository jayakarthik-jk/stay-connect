import { StyleSheet, Text as NativeText, View } from "react-native";
import React from "react";
import useDynamicColors from "../../Hooks/useDynamicColors";

const Text = ({ children, style: customStyle, ...props }) => {
  const { font } = useDynamicColors();
  return (
    <NativeText style={[styles.text, font, customStyle]} {...props}>
      {children}
    </NativeText>
  );
};

export default Text;

const styles = StyleSheet.create({
  text: {},
});
