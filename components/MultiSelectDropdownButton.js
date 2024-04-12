import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { FontSize, FontFamily, Color, Moderate_Units } from "../GlobalStyles";
import { Layout, Select, SelectItem } from '@ui-kitten/components';

const MultiSelectDropdownButton = ({ 
    title, 
    dropdownOptions,
    onSelection,
    dropdownSelectionIndex,
  }) => {

  getDisplayValues = () => {
    const newDisplayValues = [];

    {dropdownSelectionIndex?.map((index) => (
      newDisplayValues.push((dropdownOptions[index.row].title).toString())
    ))}
    
    return newDisplayValues;
  };

  return (
    <View>
      <Text style={[styles.title]}>
        {title}
      </Text>
      <Layout level="1">
        <Select
          multiSelect={true}
          status="primary"
          selectedIndex={dropdownSelectionIndex}
          onSelect={(newArray) => onSelection(newArray)}
          placeholder={"Select one or more options"}
          value={getDisplayValues().toString()}
        >
          {dropdownOptions.map((option) => (
            <SelectItem key={option.key} title={option.title} />
          ))}
        </Select>
      </Layout>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: FontSize.fs_16,
    color: Color.darkGrey,
    textAlign: "left",
    fontFamily: FontFamily.subtitle,
    marginBottom: Moderate_Units.p_2,
  },
});

export default MultiSelectDropdownButton;