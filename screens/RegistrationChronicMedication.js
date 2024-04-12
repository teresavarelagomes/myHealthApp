import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Color, Moderate_Units } from "../GlobalStyles";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import ManagementItem from "../components/ManagementItem";
import SubmitButton from "../components/SubmitButton";
import { useAuth } from "../context/AuthProvider";
import { deleteRequest, getAllItems } from "../api/api";
import { getFrequency } from "../utils/medication";
import LoadingSpinner from "../components/LoadingSpinner";

const RegistrationChronicMedication = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const { userId } = useAuth();

  const [medication, setMedication] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isFocused) {
      getMedication().then(() => {
        setIsLoading(false);
      });
    }
  }, [isFocused]);

  const getMedication = async () => {
    try {
      const response = await getAllItems(`/user/${userId}/medication`);
      setMedication(response);
    } catch (error) {
      console.log("Error getting medication: ");
      console.log(error.response);
    }
  };

  const onHandleDelete = (id) => {
    deleteMedication(id).then((success) => {
      if (success) {
        const newList = medication.filter((item) => item.id !== id);
        setMedication(newList);
      }
    });
  }

  const deleteMedication = async (id) => {
    try {
      const response = await deleteRequest(`/user/${userId}/medication/${id}`);
      if (response.status == 200) {
        return true;
      }
    } catch (error) {
      console.log("Error deleting medication: ");
      console.log(error.response);
    }
  };

  const ProgressRadio = () => (
    <View style={[styles.ellipseParentFlexBox, styles.marginVertical]}>
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
        style={styles.selectedEllipse}
        contentFit="cover"
        source={require("../assets/ellipse_red.png")}
      />
      <Image
        style={[styles.unselectedEllipse]}
        contentFit="cover"
        source={require("../assets/round_circle_red.png")}
      />
    </View>
  );

  const MedicationSelection = () => (
    <View style={[styles.whiteBubble, styles.parentBox, styles.marginVertical]}>
      <FlatList
        scrollEnabled={false}
        data={medication}
        renderItem={({ item }) => <ManagementItem
          id={item.id}
          title={item.commercialName}
          subtitle={getFrequency(item.frequency)}
          hasDelete={true}
          onDeleteHandler={onHandleDelete}
        />}
      />
    </View>
  );

  return (
    <View style={styles.page}>
      <View style={[styles.titles, styles.marginVertical]}>
        <Title text={"Chronic Medication"} />
        <Subtitle text={"Select the medications you usually take, if applicable"} />
      </View>
      {isLoading ? <LoadingSpinner /> : medication?.length > 0 && <MedicationSelection />}
      <TouchableOpacity
        style={[styles.addCircle, styles.marginVertical]}
        activeOpacity={0.2}
        onPress={() => navigation.navigate("AddUserMedication")}
      >
        <Image
          style={styles.addCircleIcon}
          contentFit="cover"
          source={require("../assets/add_red.png")}
        />
      </TouchableOpacity>
      <ProgressRadio />
      <View style={[styles.marginVertical]}>
        <SubmitButton
          text={"Next"}
          onPressButton={() => navigation.navigate("RegistrationHealthData")}
        />
      </View>
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
    borderRadius: Moderate_Units.p_10,
    backgroundColor: Color.colorWhite,
  },
  marginVertical: {
    marginVertical: Moderate_Units.p_10,
  }
});

export default RegistrationChronicMedication;
