import { View, StyleSheet, ImageBackground, TextInput } from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import Touchable from "../Common/Touchable";
import List from "../Common/List";
import Text from "../Common/Text";
import Avatar from "../Common/Avatar";
import MessageElement from "../Message/MessageElement";
import { colors } from "../../Util";
import { useUser } from "../../Context/User";
import { useConversations } from "../../Context/Conversations";

function ChatScreen() {
  const route = useRoute();
  const { user } = useUser();
  const { name, profile, id: conversationId } = route.params;
  const { getMessages, addMessage, updateMessageSeen } = useConversations();
  const friendId = conversationId.replace(user.id, "").replace("-", "");
  const messages = getMessages(conversationId);
  const [input, setInput] = useState("");

  useEffect(() => {
    updateMessageSeen(conversationId, friendId);
  }, []);

  const handleSend = () => {
    if (input && input.length > 0) {
      addMessage(user.id, friendId, input);
      setInput("");
    }
  };
  return (
    <ImageBackground
      style={styles.background}
      source={require("../../../assets/wallpaper.jpg")}
    >
      <View style={styles.container}>
        {messages.length <= 0 ? (
          <View style={styles.noMessagesSection}>
            <View style={styles.noMessagesCard} />
            <View style={styles.noMessagesContainer}>
              <Avatar name={name} profile={profile} style={styles.profile} />
              <Text style={styles.noMessagesText}>Start Conversation</Text>
            </View>
          </View>
        ) : (
          <List
            data={messages}
            Component={MessageElement}
            inverted
            contentContainerStyle={{ flexDirection: "column-reverse", gap: 2 }}
          />
        )}
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type here"
          placeholderTextColor={colors.grey}
          autoFocus
        />
        <Touchable noFeedback onPress={handleSend}>
          <View style={styles.btnContainer}>
            <Text>
              <Ionicons name="send" size={25} />
            </Text>
          </View>
        </Touchable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    padding: 5,
    paddingBottom: 80,
  },
  btnContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    position: "absolute",
    right: 0,
    bottom: 0,
    margin: 10,
  },
  input: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 45,
    backgroundColor: colors.white,
    color: colors.dark,
    marginBottom: 17.5,
    marginTop: 20,
    marginHorizontal: 15,
    borderRadius: 25,
    fontSize: 18,
    paddingLeft: 15,
    paddingRight: 60,
  },
  noMessagesSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noMessagesContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "75%",
    height: "50%",
    gap: 10,
  },
  noMessagesCard: {
    backgroundColor: colors.darkGrey,
    opacity: 0.4,
    width: "75%",
    height: "50%",
    borderRadius: 10,
    position: "absolute",
  },
  noMessagesText: {
    color: colors.white,
    fontSize: 20,
  },
  profile: {
    width: 150,
    height: 150,
  },
});

export default ChatScreen;
