import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
import { FontSize, FontFamily, Color, Moderate_Units } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};

const GoBack = ({
  goBackTitle,
  onFrameGoBackPress,
  back,
  backDisplay,
  backAlignItems,
  backWidth,
  textColor,
}) => {

  const backStyle = useMemo(() => {
    return {
      ...getStyleValue("display", backDisplay),
      ...getStyleValue("alignItems", backAlignItems),
      ...getStyleValue("width", backWidth),
      ...getStyleValue("color", textColor ? textColor : Color.darkGrey),
    };
  }, [backDisplay, backAlignItems, backWidth, textColor]);

  return (
    <Pressable style={styles.frameGoBack} onPress={onFrameGoBackPress}>
      <Image style={styles.backIcon} contentFit="cover" source={back} />
      <Text style={[styles.back, backStyle]} numberOfLines={1}>
        {goBackTitle}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  backIcon: {
    width: Moderate_Units.p_20,
    height: Moderate_Units.p_20,
  },
  back: {
    fontSize: FontSize.fs_22,
    fontFamily: FontFamily.subtitle,
    textAlign: "left",
  },
  frameGoBack: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default GoBack;
