import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { Color, FontFamily, FontSize, Moderate_Units } from "../GlobalStyles";

const SearchBar = ({clicked, searchPhrase, setSearchPhrase, setClicked}) => {
    
    return (
    <View style={styles.container}>
      <View
        style={
          clicked
            ? styles.searchBar__clicked
            : styles.searchBar__unclicked
        }
      >
        <Feather
          name="search"
          size={ Moderate_Units.p_20 }
          color={Color.lightOrange}
          style={{ marginLeft: Moderate_Units.p_1 }}
        />
        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
        {clicked && (
          <Entypo name="cross" size={ Moderate_Units.p_18 } color={Color.lightGrey} style={{ padding: 1 }} onPress={() => {
              setSearchPhrase("")
          }}/>
        )}
      </View>
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    backgroundColor: Color.colorWhite,
    borderRadius: Moderate_Units.p_10,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: Moderate_Units.p_10,
    flexDirection: "row",
    backgroundColor: Color.colorWhite,
    borderRadius: Moderate_Units.p_10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontFamily: FontFamily.subtitle,
    fontSize: FontSize.fs_16,
    color: Color.darkGrey,
    marginHorizontal: Moderate_Units.p_5,
    flex: 1,
  },
});
