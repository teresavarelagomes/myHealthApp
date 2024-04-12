import React from "react";
import { FlatList, StyleSheet } from "react-native";
import MenuItem from "./MenuItem";


const MenuList = ({ menuContent, scrollDisabled }) => {

  return (
    <FlatList
      scrollEnabled={scrollDisabled ? false : true}
      data={menuContent}
      renderItem={({ item }) =>
        <MenuItem text={item.title} iconSource={item.iconSource} onClick={item.action} />
      }
      contentContainerStyle={styles.frameFlatListContent}
    />
  );
};

const styles = StyleSheet.create({
  frameFlatListContent: {
    flexDirection: "column",
  },
});

export default MenuList;
