import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontFamily, FontSize, Color, Moderate_Units } from "../GlobalStyles";
import GarbageButton from "./GarbageButton";

const ManagementItem = ({ id, title, subtitle, hasDelete, onDeleteHandler }) => {

  return (
    <View style={[styles.checkBoxParent]}>
      <View style={[styles.textParent, subtitle ? styles.smallerMargin : styles.biggerMargin]}>
        <Text style={[styles.title]}>{title}</Text>
        {subtitle &&
          <Text style={[styles.subtitle]}>
            {subtitle}
          </Text>}
      </View>
      {hasDelete && <View style={styles.marginLeft}>
        <GarbageButton onGarbageClick={() => onDeleteHandler(id)} />
      </View>}
    </View>
  );
};

const styles = StyleSheet.create({
  marginLeft: {
      marginLeft: Moderate_Units.p_5
  },
  checkBoxParent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  smallerMargin: {
    marginVertical: Moderate_Units.p_5,
  },
  biggerMargin: {
    marginVertical: Moderate_Units.p_10,
  },
  textParent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 1,
  },
  title: {
    fontSize: FontSize.fs_16,
    color: Color.darkGrey,
    fontFamily: FontFamily.subtitle,
    marginBottom: Moderate_Units.p_5,
  },
  subtitle: {
    fontSize: FontSize.fs_14,
    color: Color.lightGrey,
    fontFamily: FontFamily.subtitle,
  },
});

export default ManagementItem;
