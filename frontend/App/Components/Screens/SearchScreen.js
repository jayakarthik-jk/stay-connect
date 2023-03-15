import { StyleSheet, View } from "react-native";
import React from "react";
import SearchBar from "../Common/SearchBar";
import constants from "expo-constants";
const SearchScreen = () => {
  const handleSearch = () => {};
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <SearchBar onSearch={handleSearch} />
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    marginHorizontal: 10,
    marginTop: constants.statusBarHeight - 10,
  },
});
