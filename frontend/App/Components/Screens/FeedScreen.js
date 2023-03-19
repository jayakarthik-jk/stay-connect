import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import useDynamicColors from "../../Hooks/useDynamicColors";
import Labels from "../../Navigation/Labels";
import Text from "../Common/Text";
function FeedScreen() {
  const { background } = useDynamicColors();
  const navigation = useNavigation();
  const handleSearch = () => {
    navigation.navigate(Labels.SEARCH_SCREEN);
  };
  return (
    <View style={[styles.container, background]}>
      <Text style={styles.searchIcon}>
        <Ionicons name="search" size={24} onPress={handleSearch} />
      </Text>
      <Text style={styles.header}>Posts</Text>
      {/* here comes the recommended peoples */}
      {/* posts */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchIcon: {
    position: "absolute",
    top: Constants.statusBarHeight,
    right: 15,
    padding: 10,
    borderRadius: 30,
  },
  header: {
    position: "absolute",
    top: Constants.statusBarHeight,
    left: 15,
    fontSize: 24,
    fontWeight: "bold",
    padding: 10,
  },
});

export default FeedScreen;
