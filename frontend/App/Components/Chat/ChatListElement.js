import { Text, View, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useDynamicColors from "../../Hooks/useDynamicColors";

import { colors } from "../../Util";

import Touchable from "../Common/Touchable";
import SvgImage from "../Common/SvgImage";
import Labels from "../../Navigation/Labels";

function ChatListElement({ username, message, profile, unread, count, id }) {
  const navigation = useNavigation();
  const { background, font } = useDynamicColors();
  return (
    <Touchable
      onPress={() => navigation.navigate(Labels.CHAT_SCREEN, { id, username })}
    >
      <View style={[styles.container, background]}>
        <View style={styles.leftContainer}>
          {profile ? (
            <Image source={profile} style={styles.profile} />
          ) : (
            <View style={styles.profile}>
              <SvgImage seed={username} />
            </View>
          )}
          <View style={styles.messageContainer}>
            <Text style={[styles.name, font]}>{username}</Text>
            <Text style={[styles.message, font]}>{message}</Text>
          </View>
        </View>
        {unread && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{count}</Text>
          </View>
        )}
      </View>
    </Touchable>
  );
}

const styles = StyleSheet.create({
  badge: {
    minWidth: 25,
    minHeight: 25,
    borderRadius: 100,
    padding: 2,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondary,
  },
  badgeText: {
    color: colors.white,
  },
  container: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContainer: {
    flexDirection: "row",
  },
  message: {
    fontWeight: "bold",
  },
  messageContainer: {
    justifyContent: "space-between",
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profile: {
    width: 55,
    height: 55,
    marginRight: 10,
    borderRadius: 30,
    overflow: "hidden",
  },
});

export default ChatListElement;
