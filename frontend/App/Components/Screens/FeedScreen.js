import { StyleSheet, View, Text } from "react-native";
import Constants from "expo-constants";
import useDynamicColors from "../../Hooks/useDynamicColors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Labels from "../../Navigation/Labels";

function FeedScreen() {
  const { background, font } = useDynamicColors();
  const navigation = useNavigation();
  const handleSearch = () => {
    console.log("working");
    navigation.navigate(Labels.SEARCH_SCREEN);
  };
  return (
    <View style={[styles.container, background]}>
      <Ionicons
        name="search"
        size={24}
        color={font.color}
        style={styles.searchIcon}
        onPress={handleSearch}
      />
      <Text style={[styles.header, font]}>Posts</Text>
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
