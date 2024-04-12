import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import GoBack from "../components/GoBack";
import { FontFamily, FontSize, Color, Moderate_Units } from "../GlobalStyles";
import DateInputField from "../components/DateInputField";
import SubmitButton from "../components/SubmitButton";
import { postRequest } from "../api/api";
import { useAuth } from "../context/AuthProvider";

const initialState = {
  description: "",
  healthIssueCoditicationIdentifier: "",
  startedAt: "",
  endedAt: "",
};

const AddUserHealthProblem = ({ route }) => {
  const navigation = useNavigation();

  const { userId } = useAuth();

  const isHealthIssueSelected = route.params !== undefined && route.params.title !== undefined;
  
  const [healthIssue, setHealthIssue] = useState(initialState);

  useEffect(() => {
    if (route.params && route.params.item) {
      setHealthIssue(prevState => ({
        ...prevState,
        description: route.params.item.description,
        healthIssueCoditicationIdentifier: route.params.item.id
      }));
    }
  }, [isHealthIssueSelected]);

  const onSubmitHandle = () => {
    addHealthIssue().then((success) => {
      success && navigation.goBack();
    });
  };

  const addHealthIssue = async () => {
    try {
      const response = await postRequest(`/user/${userId}/healthIssue`, healthIssue);

      return response.status == 200;
    } catch (error) {
      console.log("Error adding health issue: ");
      console.log(error);
    }
  };

  const handleChange = (value, name) => {
    setHealthIssue({
      ...healthIssue,
      [name]: value
    });
  };

  const HealthIssueSelection = () => (
    <View>
      <Text
        style={[styles.title]}
      >
        Nome da doença
      </Text>
      <TouchableOpacity
        style={[styles.parentInputText]}
        onPress={() => navigation.navigate("HealthIssueSearchSelection")}
      >
        <Text style={[styles.textInput]} >
          {isHealthIssueSelected ? route.params.title : "Select health problem"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.page}>
      <GoBack
        goBackTitle="Add Health Problem"
        onFrameGoBackPress={() => navigation.goBack()}
        back={require("../assets/back-grey.png")}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.frameScrollViewContent}
      >
        <View style={styles.marginTop}>
          <HealthIssueSelection />
          <DateInputField
            title={"Starting date"}
            name={"startedAt"}
            value={healthIssue.startedAt}
            onChangeText={handleChange}
          />
          <View style={styles.marginTop}>
            <DateInputField
              title={"End date (optional)"}
              name={"endedAt"}
              value={healthIssue.endedAt}
              onChangeText={handleChange}
            />
          </View>
        </View>
        {isHealthIssueSelected && healthIssue.startedAt !== '' && <View style={styles.marginTop}>
          <SubmitButton text={"Add"} onPressButton={onSubmitHandle} />
        </View>}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
    justifyContent: "flex-start",
  },
  frameScrollViewContent: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  marginTop: {
    marginTop: Moderate_Units.p_10,
  },
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
    marginBottom: Moderate_Units.p_10,
  },
  title: {
    fontSize: FontSize.fs_16,
    color: Color.darkGrey,
    textAlign: "left",
    fontFamily: FontFamily.subtitle,
    marginBottom: Moderate_Units.p_2,
  },
});

export default AddUserHealthProblem;
