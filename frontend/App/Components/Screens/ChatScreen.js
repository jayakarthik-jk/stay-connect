import { View, StyleSheet, ImageBackground, TextInput } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { colors, genId, getTime } from "../../Util";
import Touchable from "../Common/Touchable";
import List from "../Common/List";
import Text from "../Common/Text";
import MessageElement from "../Message/MessageElement";
import { useRoute } from "@react-navigation/native";
import Http from "../../Services/Http";

const data = [
  {
    id: genId(),
    message: "hey",
    time: getTime(),
    send: true,
    sameUser: false,
  },
  {
    id: genId(),
    message: "how are you",
    time: getTime(),
    send: true,
    sameUser: true,
  },
  {
    id: genId(),
    message: "I am fine",
    time: getTime(),
    send: false,
    sameUser: false,
  },
  {
    id: genId(),
    message: "what about you",
    time: getTime(),
    send: false,
    sameUser: true,
  },
];

function ChatScreen() {
  const route = useRoute();
  useEffect(() => {
    const { id: conversationId } = route.params;
    const messages = Http.getMessages(conversationId);

    if (messages instanceof Error) return alert(messages.message);

    setMessages(messages);
  }, []);

  const [messages, setMessages] = useState(data);
  const [input, setInput] = useState("");
  const isSameUser = () => messages[messages.length - 1]?.send;
  const handleSend = () => {
    if (!input || input.length < 0) return;
    const newMessage = {
      id: genId(),
      message: input,
      time: getTime(),
      send: true,
      sameUser: isSameUser(),
    };
    setMessages((oldMessages) => [...oldMessages, newMessage]);
    setInput("");
  };
  return (
    <ImageBackground
      style={styles.background}
      source={require("../../../assets/wallpaper.jpg")}
    >
      <View style={styles.container}>
        <List data={messages} Component={MessageElement} />
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
    paddingHorizontal: 15,
  },
});

export default ChatScreen;
