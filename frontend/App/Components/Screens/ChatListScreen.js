import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

import ChatScreenHeader from "../Chat/ChatScreenHeader";
import ChatListElement from "../Chat/ChatListElement";
import List from "../Common/List";
import Text from "../Common/Text";

import useDynamicColors from "../../Hooks/useDynamicColors";
import { useSocket } from "../../Context/Socket";
import { useUser } from "../../Context/User";

function ChatListScreen() {
  const { user } = useUser();
  const [chats, setChats] = useState([]);
  const [filteredChat, setFilteredChat] = useState(chats);
  const handleSearch = (query) => {
    setFilteredChat();
    user.friends.filter((chat) => chat.username.match(new RegExp(query, "i")));
  };

  const { background } = useDynamicColors();
  const socket = useSocket();
  useEffect(() => {
    if (socket) {
      socket.on("receive-message", () => {
        console.log("message received");
      });
    }
  }, [socket]);
  useEffect(() => {
    if (!user || !socket) {
      // display error
      return;
    }
    user.conversations.forEach((conv) => {
      conv.friendId = conv.conversationId.replace(user.id, "").replace("-", "");
      conv.friendName =
        conv.participantsName[0] === user.name
          ? conv.participantsName[1]
          : conv.participantsName[0];
      conv.friendProfile =
        conv.participantsProfile[0] === user.profile
          ? conv.participantsProfile[1]
          : conv.participantsProfile[0];
    });
    setChats(user.conversations);
  }, []);
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

const chats = [
  {
    name: "John Doe",
    lastMessage: "Hello",
    profile: require("../../../assets/wallpaper.jpg"),
    unread: true,
    count: 2,
    id: 1,
  },
  {
    name: "Doe",
    lastMessage: "Hi",
    profile: require("../../../assets/wallpaper.jpg"),
    unread: true,
    count: 2,
    id: 2,
  },
  {
    name: "Del",
    lastMessage: "Hey",
    profile: require("../../../assets/wallpaper.jpg"),
    unread: true,
    count: 2,
    id: 3,
  },
];
