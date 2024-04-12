import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { FontFamily, Color, FontSize, Moderate_Units } from "../GlobalStyles";

const CustomCheckBox = ({ 
  title, 
  subtitle, 
  onCheckboxSelection,
  checkBoxTextComponent,
  titleNumberOfLines,
}) => {
  const [ellipseCheckboxChecked, setEllipseCheckboxChecked] = useState(false);

  const onClickHandler = () => {
    onCheckboxSelection(title, subtitle, ellipseCheckboxChecked);
    setEllipseCheckboxChecked(!ellipseCheckboxChecked);
  }; 

  return (
    <View style={[styles.checkBoxParent]}>
      <BouncyCheckbox
        size={Moderate_Units.p_20}
        fillColor={Color.orange}
        onPress={onClickHandler}
      />
      <View style={styles.textParent}>
        {checkBoxTextComponent}
        {title && <Text style={[styles.title, styles.commonText]} numberOfLines={titleNumberOfLines}>{title}</Text>}
        {subtitle && <Text style={[styles.subtitle, styles.commonText]}>
          {subtitle}
        </Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  checkBoxParent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: Moderate_Units.p_5,
  },
  textParent: {
    flex: 1,
  },
  commonText: {
    textAlign: "left",
    fontFamily: FontFamily.subtitle,
    paddingVertical: Moderate_Units.p_2,
  },
  title: {
    fontSize: FontSize.fs_16,
    color: Color.orange,
    alignSelf: "stretch",
  },
  subtitle: {
    fontSize: FontSize.fs_15,
    color: Color.lightGrey
  },
});

export default CustomCheckBox;
