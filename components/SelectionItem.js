import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import NextPageIcon from "./NextPageIcon";
import { FontSize, FontFamily, Color, Moderate_Units } from "../GlobalStyles";

const SelectionItem = ({title, subtitle, onClick}) => {

  return (
    <TouchableOpacity
        style={[styles.selectionParent]}
        activeOpacity={0.2}
        onPress={onClick}
      >
        <View style={[styles.textParent]}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        <NextPageIcon />
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textParent: {
    display: "flex",
    flexDirection: "column",
  },
  selectionParent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Moderate_Units.p_15,
  },
  title: {
    fontSize: FontSize.fs_16,
    fontFamily: FontFamily.subtitle,
    color: Color.orange,
    textAlign: "left",
  },
  subtitle: {
    fontSize: FontSize.fs_14,
    fontFamily: FontFamily.subtitle,
    color: Color.lightGrey,
    textAlign: "left",
    paddingTop: Moderate_Units.p_2
  },
});

export default SelectionItem;
