import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { colors } from "../../Util";
import Touchable from "../Common/Touchable";
import { useNavigation } from "@react-navigation/native";
import useDynamicColors from "../../Hooks/useDynamicColors";
import SearchBar from "../Common/SearchBar";
import Labels from "../../Navigation/Labels";
function ChatScreenHeader({ onSearch }) {
  const navigation = useNavigation();
  const { font } = useDynamicColors();
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, font]}>Messages</Text>
        <Touchable
          opacity
          onPress={() => navigation.navigate(Labels.CONTACTLIST_SCREEN)}
        >
          <Ionicons name="person-add-sharp" size={24} color={font.color} />
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
    color: colors.black,
    fontSize: 22,
    fontWeight: "bold",
    paddingVertical: 5,
  },
});

export default ChatScreenHeader;
