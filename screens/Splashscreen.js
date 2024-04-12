import React from "react";
import { Image } from "expo-image";
import { StyleSheet, ImageBackground, View } from "react-native";
import { Color } from "../GlobalStyles";
import { moderateScale } from "react-native-size-matters";

const Splashscreen = () => {
  return (
    <View style={styles.splashscreen}>
      <Image
        style={styles.imageRightDownIcon}
        contentFit="cover"
        source={require("../assets/image-right-down.png")}
      />
      <Image
        style={styles.imageLeftTopIcon}
        contentFit="cover"
        source={require("../assets/image-left-top.png")}
      />
      <ImageBackground
        style={styles.appLogoIcon}
        resizeMode="cover"
        source={require("../assets/app_logo_image.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageRightDownIcon: {
    right: moderateScale(-3),
    bottom: moderateScale(-10),
    width: moderateScale(152),
    height: moderateScale(152),
    position: "absolute",
  },
  imageLeftTopIcon: {
    top: moderateScale(-9),
    left: moderateScale(0),
    width: moderateScale(158),
    height: moderateScale(158),
    position: "absolute",
  },
  appLogoIcon: {
    width: moderateScale(153),
    height: moderateScale(145),
  },
  splashscreen: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: Color.colorWhite,
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Splashscreen;
