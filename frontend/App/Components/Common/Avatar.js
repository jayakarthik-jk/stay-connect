import { StyleSheet, Image, View } from "react-native";
import SvgImage from "./SvgImage";

const Avatar = ({ profile, name, style, ...props }) => {
  if (profile)
    return (
      <Image
        source={friendProfile}
        style={[styles.profile, style]}
        {...props}
      />
    );
  return (
    <View style={[styles.profile, style]} {...props}>
      <SvgImage seed={name} />
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  profile: {
    borderRadius: 30,
    overflow: "hidden",
  },
});
