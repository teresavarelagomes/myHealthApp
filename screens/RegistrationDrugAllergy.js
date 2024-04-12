import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, Moderate_Units } from "../GlobalStyles";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import ManagementItem from "../components/ManagementItem";
import SubmitButton from "../components/SubmitButton";
import { useAuth } from "../context/AuthProvider";
import { postRequest } from "../api/api";

const RegistrationDrugAllergy = ({ route }) => {
  const navigation = useNavigation();

  const { userId } = useAuth();

  const [medicationAllergies, setMedicationAllergies] = useState([]);

  useEffect(() => {
    if (route.params && route.params.item) {
      setMedicationAllergies([...medicationAllergies, route.params.item]);
    }
  }, [route.params]);

  const ProgressRadio = () => (
    <View style={[styles.ellipseParentFlexBox, styles.marginVertical]}>
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

  const onDeleteHandler = (id) => {
    const updatedMedicationAllergies = medicationAllergies.filter(item => item.productGuid !== id);

    setMedicationAllergies(updatedMedicationAllergies);
  };

  const renderItem = ({ item }) => {
    return (
      <ManagementItem
        id={item.productGuid}
        title={item.commercialName}
        subtitle={item.dosage}
        hasDelete={true}
        onDeleteHandler={onDeleteHandler}
      />
    );
  }

  const MedicationSelection = () => (
    <View style={[styles.whiteBubble, styles.parentBox, styles.marginVertical]}>
      <FlatList
        scrollEnabled={false}
        data={medicationAllergies}
        renderItem={renderItem}
      />
    </View>
  );

  const onSubmitHandle = () => {
    addDrugAllergy().then((success) => {
      success && navigation.navigate("RegistrationFoodAllergy");
    });
  };

  const addDrugAllergy = async () => {
    try {
      const promises = medicationAllergies.map(async (allergy) => {
        const response = await postRequest(`/user/${userId}/allergy`, {
          allergyType: "DRUG",
          description: allergy.productGuid,
          codification: "INFARMED"
        });

        return response.status == 200;
      });

      const results = await Promise.all(promises);

      return results.every(result => result === true);
    } catch (error) {
      console.log("Error adding drug allergies: ");
      console.log(error);
      return false;
    }
  };

  return (
    <View style={styles.page}>
      {<View>
        <View style={[styles.titles, styles.marginVertical]}>
          <Title text={"Drug Allergies"} />
          <Subtitle text={"Select the medications you are allergic to, if applicable"} />
        </View>
        {medicationAllergies?.length > 0 && <MedicationSelection />}
        <TouchableOpacity
          style={[styles.addCircle, styles.marginVertical]}
          activeOpacity={0.2}
          onPress={() => navigation.navigate("DrugSearchSelection", {
            navigationRoute: "RegistrationDrugAllergy"
          })}
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
            onPressButton={onSubmitHandle}
          />
        </View>
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

export default RegistrationDrugAllergy;
