import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Color, Moderate_Units } from "../GlobalStyles";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import ManagementItem from "../components/ManagementItem";
import SubmitButton from "../components/SubmitButton";
import { useAuth } from "../context/AuthProvider";
import { getAllItems } from "../api/api";

const RegistrationHealthProblems = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const { userId } = useAuth();

  const [healthIssues, setHealthIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isFocused) {
      getHealthIssues().then(() => {
        setIsLoading(false);
      });
    }
  }, [isFocused]);

  const getHealthIssues = async () => {
    try {
      const response = await getAllItems(`/user/${userId}/healthIssue`);
      setHealthIssues(response);
    } catch (error) {
      console.log("Error getting health issues: ");
      console.log(error.response);
    }
  };

  const ProgressRadio = () => (
    <View style={[styles.ellipseParentFlexBox, styles.marginVertical]}>
      <Image
        style={styles.selectedEllipse}
        contentFit="cover"
        source={require("../assets/ellipse_red.png")}
      />
      <Image
        style={[styles.unselectedEllipse]}
        contentFit="cover"
        source={require("../assets/round_circle_red.png")}
      />
      <Image
        style={[styles.unselectedEllipse]}
        contentFit="cover"
        source={require("../assets/round_circle_red.png")}
      />
      <Image
        style={[styles.unselectedEllipse]}
        contentFit="cover"
        source={require("../assets/round_circle_red.png")}
      />
      <Image
        style={[styles.unselectedEllipse]}
        contentFit="cover"
        source={require("../assets/round_circle_red.png")}
      />
    </View>
  );

  const HealthIssueSelection = () => (
    <View style={[styles.whiteBubble, styles.parentBox, styles.marginVertical]}>
      <FlatList
        scrollEnabled={false}
        data={healthIssues}
        renderItem={({ item }) => <ManagementItem
          title={item.description}
        />}
      />
    </View>
  );

  return (
    <View style={styles.page}>
      {!isLoading && <View>
        <View style={[styles.titles, styles.marginVertical]}>
          <Title text={"My Health Issues"} />
          <Subtitle text={"To complete your profile setup, add at least one health issue"} />
        </View>
        {healthIssues?.length > 0 && <HealthIssueSelection />}
        <TouchableOpacity
          style={[styles.addCircle, styles.marginVertical]}
          activeOpacity={0.2}
          onPress={() => navigation.navigate("AddUserHealthProblem")}
        >
          <Image
            style={styles.addCircleIcon}
            contentFit="cover"
            source={require("../assets/add_red.png")}
          />
        </TouchableOpacity>
        <ProgressRadio />
        {healthIssues?.length > 0 &&
          <View style={[styles.marginVertical]}>
            <SubmitButton
              text={"Next"}
              onPressButton={() => navigation.navigate("RegistrationDrugAllergy")}
            />
          </View>
        }
      </View>}
    </View>
  );
};

const styles = StyleSheet.create({
  ellipseParentFlexBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: Moderate_Units.p_30,
  },
  unselectedEllipse: {
    height: Moderate_Units.p_22,
    width: Moderate_Units.p_22,
  },
  selectedEllipse: {
    height: Moderate_Units.p_22,
    width: Moderate_Units.p_22,
  },
  addCircleIcon: {
    width: Moderate_Units.p_40,
    height: Moderate_Units.p_40,
  },
  addCircle: {
    justifyContent: "center",
    alignItems: "center",
  },
  page: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: Color.veryLightGrey,
    paddingHorizontal: Moderate_Units.p_16,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  titles: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  parentBox: {
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.10)",
  },
  whiteBubble: {
    paddingVertical: Moderate_Units.p_5,
    paddingHorizontal: Moderate_Units.p_10,
    borderRadius: Moderate_Units.p_20,
    backgroundColor: Color.colorWhite,
  },
  marginVertical: {
    marginVertical: Moderate_Units.p_10,
  }
});

export default RegistrationHealthProblems;
