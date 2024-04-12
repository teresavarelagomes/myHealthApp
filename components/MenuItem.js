import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { FontSize, FontFamily, Color, Moderate_Units } from "../GlobalStyles";

const MenuItem = ({ text, iconSource, onClick }) => {

  return (
    <TouchableOpacity
      style={[styles.itemParent]}
      activeOpacity={0.2}
      onPress={onClick}
    >
      <Image
        style={styles.icon}
        contentFit="cover"
        source={iconSource}
      />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: Moderate_Units.p_25,
    height: Moderate_Units.p_25,
  },
  text: {
    fontSize: FontSize.fs_16,
    fontFamily: FontFamily.subtitle,
    color: Color.orange,
    textAlign: "left",
    paddingLeft: 10,
  },
  itemParent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: Moderate_Units.p_10,
  },
});

export default MenuItem;
