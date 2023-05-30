import { StyleSheet, View, Image, Share } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import Text from "../Common/Text";
import Button from "../Common/Button";
import Input from "../Common/Input";
import Touchable from "../Common/Touchable";
import { colors } from "../../Util";
import Labels from "../../Navigation/Labels";

import useDynamicColors from "../../Hooks/useDynamicColors";
import Backend from "../../Services/Backend";
import { useUser } from "../../Context/User";
import { useConversations } from "../../Context/Conversations";

function ContactsScreen() {
  const { background } = useDynamicColors();
  const [email, setEmail] = useState();
  const { user } = useUser();
  const { addConversation } = useConversations();
  const navigation = useNavigation();
  const handleSubmit = async () => {
    const conversation = await Backend.makeConversation(email);
    if (conversation instanceof Error) return alert(conversation.message);
    addConversation(conversation);
    const convoPageProps = {
      id: conversation.conversationId,
      name:
        conversation.participants[0].id === user.id
          ? conversation.participants[1]?.name
          : conversation.participants[0]?.name,
      profile:
        conversation.participants[0].id === user.id
          ? conversation.participants[1]?.profile
          : conversation.participants[0]?.profile,
    };
    navigation.replace(Labels.CHAT_SCREEN, convoPageProps);
  };
  const handleInviteFriends = () => {
    const message = `
    Hi ${email || ""},
    I wanted to invite you to join me on Stay Connect - an app that helps us stay connected and chat easily.
    Just download the app from the Play Store or App Store and let's connect!
    Looking forward to chatting with you.

    ${user.name}
    `;
    Share.share({
      message,
      url: "https://stay-connect.com",
      title: "Stay-Connect",
    });
  };
  return (
    <View style={[styles.container, background]}>
      <Image
        source={require("../../../assets/login.png")}
        resizeMode="contain"
        style={styles.backgroundImage}
      />
      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Button onPress={handleSubmit}>Start Convo</Button>
      <Text style={styles.redirectText}>
        <Touchable noFeedback onPress={handleInviteFriends}>
          <Text style={styles.redirectLink}>Invite&nbsp;</Text>
        </Touchable>
        Your friends
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
    marginBottom: 15,
  },
  backgroundImage: {
    width: "100%",
    height: 320,
  },
  redirectText: {
    color: colors.grey,
    textAlign: "center",
    padding: 10,
    marginTop: 20,
  },
  redirectLink: {
    color: colors.secondary,
  },
});

export default ContactsScreen;
