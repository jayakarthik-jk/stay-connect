import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../../Util";
import Text from "../Common/Text";

function MessageElement({
  message,
  time,
  send = false,
  sameUser = false,
  status = "delivered",
}) {
  let icon = undefined;
  if (status === "progress") {
    icon = "time";
  } else if (status === "sent") {
    icon = "checkmark-sharp";
  } else {
    icon = "checkmark-done-sharp";
  }
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.messageContainer,
          send ? styles.rightMessageContainer : styles.leftMessageContainer,
        ]}
      >
        {!sameUser && (
          <View
            style={[
              styles.triangle,
              send ? styles.rightTriangle : styles.leftTriangle,
            ]}
          />
        )}
        <View
          style={[
            styles.message,
            message.length > 25 ? styles.fdc : styles.fdr,
            send ? styles.rightMessage : styles.leftMessage,
            sameUser && (send ? styles.mr : styles.ml),
          ]}
        >
          <Text style={styles.text}>{message}</Text>
          <Text style={styles.messageTime}>
            {time}
            {send && <Ionicons name={icon} size={16} color={colors.grey} />}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  message: {
    padding: 5,
    paddingVertical: 7,
    borderRadius: 10,
    maxWidth: "80%",
    alignItems: "flex-end",
  },
  fdc: {
    flexDirection: "column",
  },
  fdr: {
    flexDirection: "row",
  },
  leftMessage: {
    backgroundColor: colors.secondary,
    borderTopLeftRadius: 0,
  },
  rightMessage: {
    backgroundColor: colors.primary,
    borderTopRightRadius: 0,
  },
  messageContainer: {
    margin: 1,
  },
  mr: {
    marginRight: 10,
  },
  ml: {
    marginLeft: 10,
  },
  leftMessageContainer: {
    flexDirection: "row",
  },
  rightMessageContainer: {
    flexDirection: "row-reverse",
  },
  text: {
    fontSize: 16,
    paddingHorizontal: 10,
  },
  messageTime: {
    fontSize: 10,
    color: colors.grey,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderBottomColor: "transparent",
  },
  leftTriangle: {
    borderTopColor: colors.secondary,
    borderRightColor: colors.secondary,
    borderLeftColor: "transparent",
  },
  rightTriangle: {
    borderTopColor: colors.primary,
    borderLeftColor: colors.primary,
    borderRightColor: "transparent",
  },
});

export default MessageElement;
