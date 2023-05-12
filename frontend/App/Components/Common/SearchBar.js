import { StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../../Util";
import { Ionicons } from "@expo/vector-icons";
const SearchBar = ({ onSearch, onClick, query }) => {
  return (
    <View style={styles.searchSection}>
      <View style={styles.iconContainer}>
        <Ionicons name="search" size={24} color={colors.grey} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={query}
        onChangeText={onSearch}
        underlineColorAndroid="transparent"
        onPressIn={onClick}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  iconContainer: {
    alignSelf: "center",
    justifyContent: "center",
  },
  searchSection: {
    height: 45,
    borderRadius: 20,
    flexDirection: "row",
    backgroundColor: colors.lightGrey,
    paddingHorizontal: 10,
    marginVertical: 15,
  },
  input: {
    flex: 1,
    paddingLeft: 5,
    fontSize: 16,
  },
});
