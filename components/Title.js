import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

const Title = ({ 
  text,
  textColor, 
}) => {
  return (
    <View>
      <Text style={[textColor ? {
                        color: textColor,
                    } : {
                        color: Color.orange,
                    },
                    styles.text]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: FontSize.fs_35,
    fontFamily: FontFamily.title,
    textAlign: "left",
  },
});

export default Title;
