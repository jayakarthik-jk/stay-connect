import { StyleSheet, View } from "react-native";
import { useEffect } from "react";

import { colors } from "../../Util";
import Text from "../Common/Text";
import useDynamicColors from "../../Hooks/useDynamicColors";

function ContactListElement({ name, number }) {
  useEffect(() => {
    //TODO: search the db for the number if user not exist add invite btn
  }, []);
  const { background, font } = useDynamicColors();
  return (
    <View style={[styles.container, background]}>
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.number}>{number}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  name: {
    fontSize: 18,
  },
  number: {
    color: colors.grey,
  },
});

export default ContactListElement;
