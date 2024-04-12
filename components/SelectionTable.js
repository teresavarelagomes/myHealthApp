import React from "react";
import {
  FlatList,
  View,
  StyleSheet,
} from "react-native";
import { Color, Moderate_Units } from "../GlobalStyles";
import SelectionItem from "./SelectionItem";

const SelectionTable = ({content, scrollDisabled}) => {

  return (
    <View style={[styles.whiteBubble, styles.parentBox]}>
      <FlatList
        scrollEnabled={scrollDisabled ? false : true}
        data={content}
        renderItem={({ item }) =>
          <SelectionItem 
            title={item.title} 
            subtitle={item.subtitle}
            onClick={item.action} 
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  whiteBubble: {
    borderRadius: Moderate_Units.p_20,
    backgroundColor: Color.colorWhite,
  },
  parentBox: {
    marginTop: Moderate_Units.p_15,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.10)",
  },
});

export default SelectionTable;
