import { StyleSheet, View } from "react-native";
import { colors } from "../../Util";
import useDynamicColors from "../../Hooks/useDynamicColors";
import { useUser } from "../../Context/User";
import Text from "../Common/Text";

function InfoSection({ postCount, viewsCount }) {
  const { background } = useDynamicColors();
  const { user } = useUser();
  user.postCount = 100;
  user.viewsCount = 10000;

  console.log(user);

  return (
    <View style={styles.infoSection}>
      <View style={styles.infoContainer}>
        <Text style={styles.infoname}>{user.name}</Text>
      </View>
      <View style={[styles.statsContainer, background]}>
        <View style={styles.countContainer}>
          <Text style={styles.statsValue}>{postCount}</Text>
          <Text style={styles.statsLabel}>Posts</Text>
        </View>
        <View style={styles.countContainer}>
          <Text style={styles.statsValue}>{viewsCount}</Text>
          <Text style={styles.statsLabel}>Views</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoSection: {
    paddingTop: 45,
    paddingHorizontal: 15,
    backgroundColor: colors.primary,
    paddingBottom: 15,
    zIndex: -1,
  },
  infoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  infoname: {
    fontSize: 18,
    marginVertical: 5,
    fontWeight: "bold",
  },
  infoNumber: {
    fontSize: 12,
    color: colors.lightGrey,
  },
  statsContainer: {
    height: 75,
    flexDirection: "row",
    borderRadius: 25,
    borderWidth: 2,
    borderBottomWidth: 0,
    borderColor: colors.secondary,
    overflow: "hidden",
    marginTop: 10,
    elevation: 10,
  },
  countContainer: {
    height: "100%",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  statsLabel: {
    fontSize: 12,
  },
  statsValue: {
    color: colors.secondary,
    fontSize: 18,
  },
});

export default InfoSection;
