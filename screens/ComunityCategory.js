import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontSize, FontFamily, Moderate_Units } from "../GlobalStyles";
import GoBack from "../components/GoBack";
import ComunityDisplayItems from "../components/ComunityDisplayItems";
import { getAllItems } from "../api/api";
import debounce from 'lodash/debounce';
import { useHealthProgram } from "../context/HealthProgramProvider";
import { getDaysInterval } from "../utils/date";
import SearchBar from "../components/SearchBar";
import { generateComunityFilterString } from "../utils/comunity";
import LoadingSpinner from "../components/LoadingSpinner";

const ComunityCategory = ({ route }) => {
  const navigation = useNavigation();

  const searchTermRef = useRef('');

  //LOGIN CONTEXT
  const { healthProgramId, healthProgramDay } = useHealthProgram();

  const [clicked, setClicked] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    debouncedSearch();
  }, []);

  const debouncedSearch = debounce(async (searchTerm) => {
    const days = getDaysInterval(healthProgramDay);
    const filter = generateComunityFilterString(days, searchTerm, route.params.category);

    try {
      const response = await getAllItems(`/healthProgram/${healthProgramId}/task?filter=${filter}`);
      setSearchResults(response);
      isLoading && setIsLoading(false);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }, 400); // Adjust the delay (in milliseconds) as needed

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    searchTermRef.current = searchTerm;

    if (searchTerm.length >= 3) {
      debouncedSearch(searchTerm);
    } else if (searchTerm === '') {
      debouncedSearch(searchTerm);
    }
  };

  return (
    <View style={[styles.page]}>
      <GoBack
        goBackTitle={route.params.title}
        onFrameGoBackPress={() => navigation.goBack()}
        back={require("../assets/back-grey.png")}
      />
      <View style={styles.frameGroup}>
        <View style={styles.inputParent}>
          <SearchBar
            searchPhrase={searchTerm}
            setSearchPhrase={handleSearch}
            clicked={clicked}
            setClicked={setClicked}
          />
        </View>
        {isLoading ? <LoadingSpinner /> : <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onMoveShouldSetResponder={() => {
            setClicked(false);
          }}
        >
          <ComunityDisplayItems data={searchResults} />
        </ScrollView>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputParent: {
    marginBottom: Moderate_Units.p_10,
  },
  inputText: {
    backgroundColor: Color.colorWhite,
    borderStyle: "solid",
    borderRadius: Moderate_Units.p_10,
    borderColor: Color.lightGrey,
    borderWidth: Moderate_Units.p_05,
    padding: Moderate_Units.p_10,
    flexDirection: "row",
    alignItems: "center",
    fontSize: FontSize.fs_16,

    fontFamily: FontFamily.subtitle,
  },
  frameGroup: {
    marginTop: Moderate_Units.p_10,
    flex: 1,
  },
  page: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: Color.veryLightGrey,
    paddingHorizontal: Moderate_Units.p_16,
    paddingTop: Moderate_Units.p_40,
    flex: 1,
  },
});

export default ComunityCategory;
