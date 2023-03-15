import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";

function Touchable({ children, noFeedback, opacity, ...props }) {
  let Component = undefined;
  if (noFeedback) {
    Component = TouchableWithoutFeedback;
  } else {
    if (Platform.OS === "android") {
      Component = TouchableNativeFeedback;
    } else {
      Component = TouchableOpacity;
    }
  }
  Component = opacity ? TouchableOpacity : Component;
  return <Component {...props}>{children}</Component>;
}

export default Touchable;
