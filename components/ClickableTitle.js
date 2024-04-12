import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";

const ClickableTitle = (props) => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        style={styles.parent}
        activeOpacity={0.2}
        onPress={() => navigation.navigate(props.navigationPage)}
      >
        <Text style={styles.title}>{props.title}</Text>
      </TouchableOpacity>
    </View>);
};

const styles = StyleSheet.create({
  title: {
    alignSelf: "stretch",
    fontSize: FontSize.fs_15,
    fontFamily: FontFamily.subtitle,
    color: Color.lightGrey,
  },
  parent: {
    alignSelf: "stretch",
  },
});

export default ClickableTitle;
