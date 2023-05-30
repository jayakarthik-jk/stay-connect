import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./User";
import { useSocket } from "./Socket";
import useConvoId from "../Hooks/useConvoId";
import { genId, getTime } from "../Util";

const ConversationsContext = createContext();

ConversationsContext.displayName = "Conversations";

export const useConversations = () => useContext(ConversationsContext);

export const ConversationsContextProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);

  const { user } = useUser();
  const socket = useSocket();
  const { genConvoId } = useConvoId();

  const addMessage = (senderId, receiverId, content) => {
    // create a message object and update the state
    let convoExist = false;
    const conversationId = genConvoId(senderId, receiverId);
    setConversations(
      conversations.map((conversation) => {
        if (conversation.conversationId === conversationId) {
          convoExist = true;
          conversation.lastMessage = content;
          if (senderId !== user.id) {
            conversation.unReadCount += 1;
          } else {
            conversation.unReadCount = 0;
          }
          const message = {
            id: genId(),
            message: content,
            senderId,
            receiverId,
            send: senderId === user.id,
            time: getTime(),
            sameUser:
              conversation?.messages.length <= 0
                ? false
                : conversation?.messages[conversation?.messages.length - 1]
                    .senderId === senderId,
          };
          conversation?.messages.push(message);
        }
        return conversation;
      })
    );

    if (!convoExist) {
      // not woking if conversation not exist
      // TODO: Implement this
    }

    // send the message using socket
    if (senderId === user.id && socket) {
      socket.emit("send-message", receiverId, content);
    }
  };

  const getMessages = (conversationId) => {
    return conversations.find(
      (conversation) => conversation.conversationId === conversationId
    ).messages;
  };

  const convertMessages = (messages) => {
    if (!messages) return [];
    const updatedMessages = [];
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      updatedMessages.push({
        id: message.id,
        message: message.content,
        time: message.createdAt || getTime(),
        send: message.senderId === user.id,
        sameUser:
          i !== 0 && updatedMessages[i - 1].senderId === message.senderId,
        senderId: message.senderId,
        receiverId: message.receiverId,
      });
    }
    return updatedMessages;
  };

  const updateMessageSeen = (conversationId, friendId) => {
    let updatable = true;
    const updated = conversations.map((conversation) => {
      if (conversation.conversationId === conversationId) {
        if (
          conversation.unReadCount > 0 &&
          conversation.lastMessageBy !== user.id
        )
          return { ...conversation, unReadCount: 0 };
        else updatable = false;
      }
      return conversation;
    });
    if (!updatable || !socket) return;
    setConversations(updated);
    socket.emit("message-seen", friendId);
  };

  useEffect(() => {
    if (user && user.conversations) {
      const mapedConvo = user.conversations.map((conversation) => ({
        ...conversation,
        messages: convertMessages(conversation.messages),
      }));
      setConversations(mapedConvo);
    }
  }, [user]);

  const addConversation = (conversation) => {
    if (conversations.findIndex((convo) => convo.id === conversation.id) !== -1)
      return;
    const updatedConvo = {
      ...conversation,
      messages: convertMessages(conversation.messages),
    };
    setConversations([...conversations, updatedConvo]);
  };

  useEffect(() => {
    if (socket) {
      socket.on("receive-message", ({ message }) => {
        addMessage(message.senderId, message.receiverId, message.content);
      });
    }
  }, [socket]);

  return (
    <ConversationsContext.Provider
      value={{
        conversations,
        setConversations,
        addMessage,
        getMessages,
        updateMessageSeen,
        addConversation,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
};

export default ConversationsContext;
