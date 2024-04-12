import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { FontSize, FontFamily, Color, Moderate_Units } from "../GlobalStyles";

const Subtitle = ({ text, textAlign, textColor }) => {

  return (
    <View style={styles.subtitleParent}>
      <Text style={[
        textAlign ? { textAlign: textAlign } : { textAlign: "left" }, 
        textColor ? { color: textColor } : { color: Color.lightOrange },
        styles.text
      ]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  subtitleParent: {
    marginVertical: Moderate_Units.p_5,
  },
  text: {
    fontSize: FontSize.fs_18,
    fontFamily: FontFamily.subtitle,
    alignSelf: "stretch",
  },
});

export default Subtitle;
