import { StyleSheet, View, Image, ImageBackground } from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

import { colors } from "../../Util";
import Touchable from "../Common/Touchable";
import SvgImage from "../Common/SvgImage";
import useDynamicColors from "../../Hooks/useDynamicColors";

function BackgroundSection() {
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const { font } = useDynamicColors();
  const pickProfileImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0]);
      // TODO: upload the image to the database
    }
  };

  const pickCoverImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (!result.canceled) {
      setCoverImage(result.assets[0]);
      // TODO: upload the image to the database
    }
  };

  return (
    <>
      <View style={styles.background}>
        <ImageBackground
          source={
            coverImage
              ? { uri: coverImage.uri }
              : require("../../../assets/wallpaper.jpg")
          }
        >
          <Touchable
            opacity
            style={styles.settingsIconContainer}
            onPress={() => navigation.navigate("Settings")}
          >
            <MaterialIcons name="settings" size={30} color={font.color} />
          </Touchable>
          <Touchable onPress={pickCoverImage}>
            <LinearGradient
              colors={["transparent", "transparent", colors.primary]}
              style={styles.linearGradient}
            />
          </Touchable>
        </ImageBackground>
      </View>
      <View>
        <View style={styles.profileSection}>
          <View style={styles.profileContainer}>
            <Touchable opacity onPress={pickProfileImage}>
              {profileImage ? (
                <Image
                  style={styles.profile}
                  source={{ uri: profileImage.uri }}
                />
              ) : (
                <SvgImage style={styles.profile} />
              )}
            </Touchable>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    height: "25%",
  },
  profile: {
    height: 130,
    width: 130,
  },
  profileSection: {
    position: "absolute",
    top: -90,
    width: "100%",
  },
  profileContainer: {
    borderRadius: 100,
    overflow: "hidden",
    alignSelf: "center",
    marginHorizontal: 25,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  editProfileBtnContainer: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  settingsIconContainer: {
    elevation: 20,
    position: "absolute",
    right: 10,
    top: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  linearGradient: {
    height: "100%",
  },
});

export default BackgroundSection;
