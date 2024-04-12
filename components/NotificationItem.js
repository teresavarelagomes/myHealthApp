import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { FontFamily, Color, FontSize, Moderate_Units } from "../GlobalStyles";

const NotificationItem = ({
  title,
  previewText,
  date,
  sourceIcon,
  isNew,
  onClick,
  disableClick,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.2}
      onPress={onClick}
      disabled={disableClick}
    >
      <View style={styles.notificationItem}>
        <View style={styles.imageBox}>
          <Image
            style={[styles.icon]}
            contentFit="cover"
            source={sourceIcon}
          />
        </View>
        <View style={styles.notificationContent}>
          <View style={styles.bottomMargin}>
            <Text style={isNew ? styles.blueTitle : styles.lightBlueTitle}>{title}</Text>
            <Text
              style={isNew ? styles.darkGrey : styles.bigLightGrey}
              numberOfLines={1}
              ellipsizeMode={"tail"}
            >
              {previewText}
            </Text>
          </View>
          <Text style={[styles.lightGrey]}>
            {date}
          </Text>
        </View>
      </View>
      {isNew && <Image
        style={styles.ellipse}
        contentFit="cover"
        source={require("../assets/ellipse_main.png")}
      />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  notificationItem: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    padding: Moderate_Units.p_8,
  },
  imageBox: {
    paddingTop: Moderate_Units.p_5,
  },
  notificationContent: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    paddingLeft: Moderate_Units.p_10,
  },
  icon: {
    width: Moderate_Units.p_25,
    height: Moderate_Units.p_25,
  },
  bottomMargin: {
    marginBottom: Moderate_Units.p_5,
  },
  blueTitle: {
    color: Color.orange,
    textAlign: "left",
    fontFamily: FontFamily.subtitle,
    fontSize: FontSize.fs_15,
    alignSelf: "stretch",
  },
  lightBlueTitle: {
    color: Color.lightOrange,
    textAlign: "left",
    fontFamily: FontFamily.subtitle,
    fontSize: FontSize.fs_15,
    alignSelf: "stretch",
  },
  darkGrey: {
    color: Color.darkGrey,
    fontSize: FontSize.fs_15,
    fontFamily: FontFamily.subtitle,
    flex: 1,
    overflow: "hidden",
    alignSelf: "stretch",
  },
  bigLightGrey: {
    color: Color.lightGrey,
    fontSize: FontSize.fs_15,
    fontFamily: FontFamily.subtitle,
    flex: 1,
    overflow: "hidden",
    alignSelf: "stretch",
  },
  lightGrey: {
    fontSize: FontSize.fs_12,
    color: Color.lightGrey,
    fontFamily: FontFamily.subtitle,
  },
  ellipse: {
    position: "absolute",
    top: 0,
    right: 0,
    width: Moderate_Units.p_10,
    height: Moderate_Units.p_10,
    zIndex: 1,
  },
});

export default NotificationItem;
