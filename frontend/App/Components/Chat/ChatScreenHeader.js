import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

import { colors } from "../../Util";
import Labels from "../../Navigation/Labels";
import Touchable from "../Common/Touchable";
import SearchBar from "../Common/SearchBar";
import Text from "../Common/Text";

function ChatScreenHeader({ onSearch }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Messages</Text>
        <Touchable
          opacity
          onPress={() => navigation.navigate(Labels.CONTACTLIST_SCREEN)}
        >
          <Text>
            <Ionicons name="person-add-sharp" size={24} />
          </Text>
        </Touchable>
      </View>
      <SearchBar onSearch={onSearch} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomWidth: 2,
    borderBottomColor: colors.secondary,
  },

  titleContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    paddingVertical: 5,
  },
});

export default ChatScreenHeader;
