import React from "react";
import { FlatList } from "react-native";

function List({ data, Component, ...props }) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Component {...item} />}
      keyExtractor={(item) => item.id}
      {...props}
    />
  );
}

export default React.memo(List);
