import React, { useState } from "react";
import {
  FlatList,
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import GoBack from "../components/GoBack";
import Subtitle from "../components/Subtitle";
import { FontFamily, FontSize, Color, Moderate_Units } from "../GlobalStyles";
import RadioSelection from "../components/RadioSelection";
import TimeInputField from "../components/TimeInputField";
import AddButton from "../components/AddButton";
import MultiSelectDropdownButton from "../components/MultiSelectDropdownButton";
import SubmitButton from "../components/SubmitButton";
import { postRequest } from "../api/api";
import { getMedicationRequest } from "../utils/medication";
import { useAuth } from "../context/AuthProvider";

const AddUserMedication = ({ route }) => {
  const navigation = useNavigation();

  const { userId } = useAuth();

  const isMedicationSelected = route.params !== undefined && route.params.title !== undefined;
  const [frequency, setFrequency] = useState(frequencyData[0].key);
  const [timeList, setTimeList] = useState([]);
  const [dropdownSelectionIndex, setDropdownSelectionIndex] = useState([]);
  
  const onSubmitHandle = () => {
    addMedication().then((success) => {
      success && navigation.goBack();
    });
  };

  const addMedication = async () => {
    const requestBody = getMedicationRequest(route.params.item, frequency, dropdownSelectionIndex, timeList);

    try {
      const response = await postRequest(`/user/${userId}/medication`, requestBody);

      return response.status == 200;
    } catch (error) {
      console.log("Error adding medication: ");
      console.log(error);
    }
  };


  const MedicationSelection = () => (
    <View style={styles.bottomMargin}>
      <Text
        style={[styles.title]}
      > 
        Medication
      </Text>
      <TouchableOpacity
        style={[styles.parentInputText]}
        onPress={() => navigation.navigate("DrugSearchSelection", {
          navigationRoute: "AddUserMedication"
        })}      >
        <Text style={[styles.textInput]} >
          {isMedicationSelected ? route.params.title : "Select medication"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const TimeTaken = () => (
    <View>
      <Text style={[styles.title]}>
        Medication times
      </Text>
      <View style={styles.frameFlexBox}>
        <AddButton onAddClick={onAddTimeHandler} />
      </View>
      {timeList?.length > 0 && <FlatList
        scrollEnabled={false}
        data={timeList}
        renderItem={({ item }) => <TimeInputField
          title={"Select time"}
          value={item.time}
          onChangeText={onChangeTimeHandler}
          hasDelete={true}
          onDelete={onDeleteTimeHandler}
          index={item.index}
        />}
      />}
    </View>
  );
  const onChangeFrequencyHandler = (clickedIndex) => {
    setFrequency(clickedIndex);
    setDropdownSelectionIndex([]);
  };

  const onDeleteTimeHandler = (deletedIndex) => {
    const newList = timeList.filter((item) => item.index !== deletedIndex);
    setTimeList(newList);
  };

  const onAddTimeHandler = () => {
    const newList = timeList.slice();
    newList.push({
      "index": Math.random(),
      "time": "09:00",
    });
    setTimeList(newList);
  };

  const onChangeTimeHandler = (index, time) => {
    const newList1 = timeList.slice();

    const newList = newList1.map(element => {
      if (element.index === index) {
        return { ...element, time: time }
      } else {
        return { ...element };
      }
    });
    setTimeList(newList);
  };

  return (
    <View style={styles.page}>
      <GoBack
        goBackTitle="Add Medication"
        onFrameGoBackPress={() => navigation.goBack()}
        back={require("../assets/back-grey.png")}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.frameScrollViewContent}
      >
        <Subtitle text="Keep your data always updated" />
        <View style={styles.marginTop}>
          <MedicationSelection />
          <View style={styles.bottomMargin}>
            <RadioSelection title={"Frequency"} onChangeSelection={onChangeFrequencyHandler} radioOptions={frequencyData} startingIndex={frequency} />
          </View>
          <View style={styles.bottomMargin}>
            {frequency !== 0 &&
              <MultiSelectDropdownButton
                title={frequency === 1 ? "Weekdays" : "Days of the month"}
                dropdownOptions={frequency === 1 ? weekDays : monthDays}
                dropdownSelectionIndex={dropdownSelectionIndex}
                onSelection={setDropdownSelectionIndex}
              />}
          </View>
          <View style={styles.bottomMargin}>
            <TimeTaken />
          </View>
        </View>
        {isMedicationSelected && timeList?.length > 0 &&
          <View>
            <SubmitButton text={"Add"} onPressButton={onSubmitHandle} />
          </View>}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontFamily: FontFamily.subtitle,
    fontSize: FontSize.fs_14,
    borderRadius: Moderate_Units.p_10,
    textAlignVertical: "center",
    borderColor: Color.lightGrey,
    borderWidth: Moderate_Units.p_05,
    backgroundColor: Color.colorWhite,
    padding: Moderate_Units.p_11,
    color: Color.darkGrey,
  },
  bottomMargin: {
    marginBottom: Moderate_Units.p_15,
  },
  parentInputText: {
    backgroundColor: Color.veryLightGrey,
    marginBottom: Moderate_Units.p_10,
  },
  page: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: Color.veryLightGrey,
    paddingHorizontal: Moderate_Units.p_16,
    paddingVertical: Moderate_Units.p_40,
    display: "flex",
    flexDirection: "column",
  },
  frameScrollViewContent: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  marginTop: {
    marginTop: Moderate_Units.p_10,
  },
  title: {
    fontSize: FontSize.fs_16,
    color: Color.darkGrey,
    textAlign: "left",
    fontFamily: FontFamily.subtitle,
    marginBottom: Moderate_Units.p_2,
  },
  frameFlexBox: {
    justifyContent: "flex-end",
    flexDirection: "row",
    marginBottom: Moderate_Units.p_8,
  },
});

const frequencyData = [
  {
    "key": 0,
    "title": "Daily",
  },
  {
    "key": 1,
    "title": "Weekly",
  },
  {
    "key": 2,
    "title": "Monthly",
  },
];

const weekDays = [
  {
    "key": "1",
    "title": "Monday"
  },
  {
    "key": "2",
    "title": "Tuesday"
  },
  {
    "key": "3",
    "title": "Wednesday"
  },
  {
    "key": "4",
    "title": "Thursday"
  },
  {
    "key": "5",
    "title": "Friday"
  },
  {
    "key": "6",
    "title": "Saturday"
  },
  {
    "key": "7",
    "title": "Sunday"
  },
];


const monthDays = [
  { key: "1", title: "1" },
  { key: "2", title: "2" },
  { key: "3", title: "3" },
  { key: "4", title: "4" },
  { key: "5", title: "5" },
  { key: "6", title: "6" },
  { key: "7", title: "7" },
  { key: "8", title: "8" },
  { key: "9", title: "9" },
  { key: "10", title: "10" },
  { key: "11", title: "11" },
  { key: "12", title: "12" },
  { key: "13", title: "13" },
  { key: "14", title: "14" },
  { key: "15", title: "15" },
  { key: "16", title: "16" },
  { key: "17", title: "17" },
  { key: "18", title: "18" },
  { key: "19", title: "19" },
  { key: "20", title: "20" },
  { key: "21", title: "21" },
  { key: "22", title: "22" },
  { key: "23", title: "23" },
  { key: "24", title: "24" },
  { key: "25", title: "25" },
  { key: "26", title: "26" },
  { key: "27", title: "27" },
  { key: "28", title: "28" },
  { key: "29", title: "29" },
  { key: "30", title: "30" },
  { key: "31", title: "31" }
];


export default AddUserMedication;
