import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import useDynamicColors from "../../Hooks/useDynamicColors";

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
