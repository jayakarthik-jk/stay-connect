import { SvgUri } from "react-native-svg";

function SvgImage({ uri, seed, style, ...props }) {
  if (uri) return <SvgUri uri={uri} style={style} {...props} />;
  if (!uri) {
    const customUri = `https://api.dicebear.com/5.x/micah/svg?radius=50${
      seed ? `&seed=${seed}` : ""
    }`;
    return <SvgUri uri={customUri} style={style} {...props} />;
  }
}

export default SvgImage;
