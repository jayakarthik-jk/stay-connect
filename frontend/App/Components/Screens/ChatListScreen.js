import { useState } from "react";
import { View, StyleSheet } from "react-native";

import ChatScreenHeader from "../Chat/ChatScreenHeader";
import ChatListElement from "../Chat/ChatListElement";
import List from "../Common/List";
import Text from "../Common/Text";

import useDynamicColors from "../../Hooks/useDynamicColors";

function ChatListScreen() {
  const chats = [
    {
      username: "John Doe",
      message: "Hello",
      profile: require("../../../assets/wallpaper.jpg"),
      unread: true,
      count: 2,
      id: 1,
    },
    {
      username: "Doe",
      message: "Hi",
      profile: require("../../../assets/wallpaper.jpg"),
      unread: true,
      count: 2,
      id: 2,
    },
    {
      username: "Del",
      message: "Hey",
      profile: require("../../../assets/wallpaper.jpg"),
      unread: true,
      count: 2,
      id: 3,
    },
  ];
  const [filteredChat, setFilteredChat] = useState(chats);
  const handleSearch = (query) => {
    setFilteredChat(
      chats.filter((chat) => chat.username.match(new RegExp(query, "i")))
    );
  };

  const { background } = useDynamicColors();

  return (
    <View style={[styles.main, background]}>
      <ChatScreenHeader onSearch={handleSearch} />
      <View
        style={
          filteredChat.length > 0
            ? [styles.main, background]
            : [styles.main, background, styles.center]
        }
      >
        {filteredChat.length > 0 ? (
          <List data={filteredChat} Component={ChatListElement} />
        ) : (
          <Text>No chats found !</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatListScreen;
