import { View, StyleSheet } from "react-native";
import { colors } from "../../Util";
import BackgroundSection from "../Profile/BackgroundSection";
import InfoSection from "../Profile/InfoSection";
import PostSection from "../Profile/PostSection";
import useDynamicColors from "../../Hooks/useDynamicColors";

function ProfileScreen() {
  const user = {
    username: "Jayakarthik",
    number: "9884117398",
    postCount: 100,
    viewsCount: 10000,
  };
  const { background } = useDynamicColors();

  return (
    <View style={[styles.container, background]}>
      <BackgroundSection />
      <InfoSection {...user} />
      <View style={styles.seperator} />
      <PostSection />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  seperator: {
    backgroundColor: colors.primary,
    height: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderWidth: 2,
    borderColor: colors.secondary,
    borderTopWidth: 0,
  },
});

export default ProfileScreen;
