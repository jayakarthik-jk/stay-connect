import { Image, StyleSheet, View, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import useDynamicColors from "../../Hooks/useDynamicColors";
import Text from "../Common/Text";
import List from "../Common/List";
import { useEffect, useState } from "react";
import Backend from "../../Services/Backend";
import { BACKEND_URL } from "../../Services/Http";
import Labels from "../../Navigation/Labels";

const Post = ({ uri, width, height }) => (
  <View>
    <Image source={{ uri, width, height }} />
  </View>
);

function FeedScreen() {
  const { background } = useDynamicColors();
  const [posts, setPosts] = useState([]);
  const window = useWindowDimensions();
  const navigation = useNavigation();
  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await Backend.getMyFriendPosts();
      if (posts instanceof Error) return alert("unable to fetch posts");
      const updatedPosts = posts.map((post) => ({
        id: post,
        uri: BACKEND_URL + "/" + post.replace("public/", ""),
        width: window.width,
        height: window.height,
      }));
      setPosts(updatedPosts);
    };
    fetchPosts();
  }, []);
  const handleAddPost = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });
    if (result.canceled) return;
    const imageAsset = result.assets[0];
    const formData = new FormData();
    const localUri = imageAsset.uri;
    const filename = localUri.split("/").pop();

    // Infer the type of the image
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;
    formData.append("image", { uri: localUri, name: filename, type });
    console.log("Uploading...");
    const res = await Backend.uploadPost(formData);
    if (res instanceof Error) return alert(res.message);
    console.log("Uploaded Successfully");
    navigation.navigate(Labels.PROFILE_SCREEN);
  };
  return (
    <View style={[styles.container, background]}>
      {/* here comes the recommended peoples */}
      {posts.length <= 0 ? (
        <View style={styles.errorMessageContainer}>
          <Text style={styles.errorMessage}>No posts found</Text>
        </View>
      ) : (
        <List
          Component={Post}
          data={posts}
          decelerationRate={0}
          snapToInterval={window.height}
          snapToAlignment="center"
        />
      )}

      <Text style={styles.searchIcon}>
        <Ionicons
          name="add"
          size={26}
          style={styles.addIcon}
          onPress={handleAddPost}
        />
      </Text>
      <Text style={styles.header}>Posts</Text>
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
  addIcon: {
    fontWeight: "bold",
  },
  errorMessageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorMessage: {
    fontSize: 22,
  },
});

export default FeedScreen;
