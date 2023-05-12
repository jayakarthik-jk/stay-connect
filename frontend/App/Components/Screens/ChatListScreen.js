import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ChatScreenHeader from "../Chat/ChatScreenHeader";
import ChatListElement from "../Chat/ChatListElement";
import List from "../Common/List";
import Text from "../Common/Text";

import useDynamicColors from "../../Hooks/useDynamicColors";
import { useUser } from "../../Context/User";
import { useConversations } from "../../Context/Conversations";

function ChatListScreen() {
  const { user } = useUser();
  const { conversations } = useConversations();
  const chats = refractorChats(conversations);
  const [query, setQuery] = useState("");
  const { background } = useDynamicColors();

  const getFilteredChats = () => {
    return chats.filter((chat) =>
      chat.friendName.match(new RegExp(query, "i"))
    );
  };

  function refractorChats(chats) {
    return chats.map((conv) => {
      conv.friendId = conv.conversationId.replace(user.id, "").replace("-", "");
      conv.friendName =
        conv.participants[0].id === user.id
          ? conv.participants[1].name
          : conv.participants[0].name;
      conv.friendProfile =
        conv.participants[0].id === user.id
          ? conv.participants[1].profile
          : conv.participants[0].profile;
      return conv;
    });
  }

  const filteredChat = getFilteredChats();
  return (
    <View style={[styles.main, background]}>
      <ChatScreenHeader onSearch={setQuery} query={query} />
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
          <Text>
            {query === "" ? (
              <>
                Start a conversation by pressing &nbsp;
                <Ionicons name="person-add-sharp" size={24} />
                &nbsp; above
              </>
            ) : (
              "No chats found !"
            )}
          </Text>
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
