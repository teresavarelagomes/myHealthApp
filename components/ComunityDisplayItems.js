import React from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Text
} from "react-native";
import { Color, FontSize, FontFamily, Moderate_Units } from "../GlobalStyles";
import ComunityDisplayCard from "./ComunityDisplayCard";

const ComunityDisplayItems = ({data}) => {

  if (data?.length > 0) {
    return (
      <FlatList
        scrollEnabled={false}
        data={data}
        renderItem={({ item }) => 
          <ComunityDisplayCard
            title={item.title}
            previewText={item.body}
            location={item.activityLocation}
            image={item.imageUri}
          />
        }
      />
    )
  } else {
    return (<View style={styles.emptyMessageParent}>
      <Text style={styles.emptyMessage}>There are no articles to show at this time.</Text>
    </View>)
  }
};

const styles = StyleSheet.create({
  emptyMessage: {
    fontSize: FontSize.fs_12,
    color: Color.lightGrey,
    textAlign: "left",
    fontFamily: FontFamily.subtitle,
  },
  emptyMessageParent: {
    marginTop: Moderate_Units.p_2,
  }
});

export default ComunityDisplayItems;
