import { useState, useEffect } from "react";
import { StyleSheet, View, useWindowDimensions, Image } from "react-native";

import useDynamicColors from "../../Hooks/useDynamicColors";
import Text from "../Common/Text";
import List from "../Common/List";

import { BACKEND_URL } from "../../Services/Http";
import Backend from "../../Services/Backend";

function PostSection() {
  const [posts, setPosts] = useState([]);
  const { background } = useDynamicColors();
  const window = useWindowDimensions();
  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await Backend.getMyPosts();
      if (posts instanceof Error) return alert("unable to fetch posts");
      const updatedPosts = posts.map((post) => ({
        id: post,
        uri: BACKEND_URL + "/" + post.replace("public/", ""),
        width: window.width / 2,
        height: 200,
      }));
      setPosts(updatedPosts);
    };
    fetchPosts();
  }, []);
  return (
    <View style={[styles.postSection, background]}>
      {posts.length <= 0 ? (
        <View style={styles.errorMessageContainer}>
          <Text style={styles.errorMessage}>No posts found</Text>
        </View>
      ) : (
        <List
          Component={Post}
          data={posts}
          numColumns={2}
          style={styles.container}
        />
      )}
    </View>
  );
}

const Post = ({ uri, width, height }) => (
  <View
    style={{
      borderRadius: 15,
      overflow: "hidden",
    }}
  >
    <Image source={{ uri, width, height }} />
  </View>
);

const styles = StyleSheet.create({
  postSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    marginTop: 5,
  },
});

export default PostSection;
