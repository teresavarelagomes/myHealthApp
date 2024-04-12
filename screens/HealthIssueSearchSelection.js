import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Moderate_Units } from "../GlobalStyles";
import GoBack from "../components/GoBack";
import DynamicSearchResults from "../components/DynamicSearchResults";
import SearchBar from "../components/SearchBar";
import { getAllItems } from "../api/api";
import debounce from 'lodash/debounce';
import DynamicSearchResult from "../components/DynamicSearchResult";

const HealthIssueSearchSelection = () => {
  const navigation = useNavigation();

  const searchTermRef = useRef('');

  const [clicked, setClicked] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Debounce the search function to limit API calls
  const debouncedSearch = debounce(async (searchTerm) => {
    try {
      const response = await getAllItems(`/healthIssueCodification?filter=prettyName~%20%27%2A${searchTerm}%2A%27`);

      if (searchTerm === searchTermRef.current) {
        setSearchResults(response);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }, 300); // Adjust the delay (in milliseconds) as needed

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    searchTermRef.current = searchTerm;

    if (searchTerm.length >= 3) { 
      debouncedSearch(searchTerm);
    } else {
      setSearchResults([]);
    }
  };

  const renderItem = (item) => {
    return (
      <DynamicSearchResult
        key={item.id}
        title={item.description}
        navigationRoute={"AddUserHealthProblem"}
        navigationParam={item}
      />
    );
  };

  return (
    <View style={styles.page}>
      <GoBack
        goBackTitle="Go back"
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onMoveShouldSetResponder={() => {
            setClicked(false);
          }}
        >
          <DynamicSearchResults
            data={searchResults}
            renderItem={renderItem}
          />
        </ScrollView>
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
  page: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: Color.veryLightGrey,
    paddingHorizontal: Moderate_Units.p_16,
    paddingTop: Moderate_Units.p_40,
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  frameGroup: {
    marginTop: Moderate_Units.p_10,
    flex: 1,
  },
});

export default HealthIssueSearchSelection;
