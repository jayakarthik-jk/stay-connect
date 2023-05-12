import { View, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import useDynamicColors from "../../Hooks/useDynamicColors";
import { colors } from "../../Util";
import Touchable from "../Common/Touchable";
import Text from "../Common/Text";
import Avatar from "../Common/Avatar";
import Labels from "../../Navigation/Labels";

function ChatListElement({
  friendId,
  friendName,
  lastMessage,
  lastMessageBy,
  friendProfile,
  unReadCount = 0,
  conversationId,
}) {
  const navigation = useNavigation();
  const { background } = useDynamicColors();
  return (
    <Touchable
      onPress={() =>
        navigation.navigate(Labels.CHAT_SCREEN, {
          id: conversationId,
          name: friendName,
          profile: friendProfile,
        })
      }
    >
      <View style={[styles.container, background]}>
        <View style={styles.leftContainer}>
          <Avatar
            name={friendName}
            profile={friendProfile}
            style={styles.profile}
          />
          <View style={styles.messageContainer}>
            <Text style={styles.name}>{friendName}</Text>
            {lastMessage && (
              <Text style={styles.message}>
                {lastMessage.length > 30
                  ? lastMessage.substring(0, 30) + "..."
                  : lastMessage}
              </Text>
            )}
          </View>
        </View>
        {lastMessageBy === friendId && unReadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{unReadCount}</Text>
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
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    paddingHorizontal: 20,
  },
  leftContainer: {
    flexDirection: "row",
  },
  message: {
    fontWeight: "bold",
  },
  messageContainer: {
    justifyContent: "center",
    gap: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profile: {
    width: 55,
    height: 55,
    marginRight: 10,
  },
});

export default ChatListElement;
