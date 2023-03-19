import { useState } from "react";
import { StyleSheet, View } from "react-native";

import useDynamicColors from "../../Hooks/useDynamicColors";
import Text from "../Common/Text";

function PostSection() {
  const { background } = useDynamicColors();
  const [userPost, setUserPost] = useState([]);
  return (
    <View style={[styles.postSection, background]}>
      {userPost.length === 0 ? <Text>No posts yet</Text> : ""}
    </View>
  );
}

const styles = StyleSheet.create({
  postSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PostSection;
