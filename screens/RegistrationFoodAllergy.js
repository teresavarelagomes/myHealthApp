import React, { useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, Moderate_Units } from "../GlobalStyles";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import SubmitButton from "../components/SubmitButton";
import InputField from "../components/InputField";
import { postRequest } from "../api/api";
import { useAuth } from "../context/AuthProvider";

const RegistrationFoodAllergy = () => {
  const navigation = useNavigation();

  const { userId } = useAuth();

  const [foodAllergies, setFoodAllergies] = useState([]);

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
    </View>
  );

  const onAddFoodAllergy = () => {
    setFoodAllergies([...foodAllergies, {
      "index": Math.random(),
      "food": "",
    }]);
  };

  const handleChange = (value, index) => {
    const updatedArray = foodAllergies.map((item) => {
      if (item.index === index) {
        return { ...item, food: value };
      } else {
        return item;
      }
    });
    setFoodAllergies(updatedArray);
  }

  const onDeleteFoodAllergy = (deletedIndex) => {
    const newList = foodAllergies.filter((item) => item.index !== deletedIndex);
    setFoodAllergies(newList);
  };

  const onSubmitHandle = () => {
    addFoodAllergy().then((success) => {
      success && navigation.navigate("RegistrationChronicMedication");
    });
  };

  const addFoodAllergy = async () => {
    try {
      const promises = foodAllergies.map(async (allergy) => {
        const response = await postRequest(`/user/${userId}/allergy`, {
          allergyType: "FOOD",
          description: allergy.food,
        });

        return response.status == 200;
      });

      const results = await Promise.all(promises);

      return results.every(result => result === true);
    } catch (error) {
      console.log("Error adding food allergies: ");
      console.log(error);
      return false;
    }
  };

  return (
    <View style={styles.page}>
      <View style={[styles.titles, styles.marginVertical]}>
        <Title text={"Food Allergies"} />
        <Subtitle text={"Select the foods you are allergic to, if applicable"} />
      </View>
      {foodAllergies?.length > 0 && <View>
        <ScrollView style={[styles.marginVertical]}>
          <FlatList
            scrollEnabled={false}
            data={foodAllergies}
            renderItem={({ item }) =>
              <InputField
                value={item.food}
                placeholder={"Fill this field"}
                onChangeText={handleChange}
                hasDelete={true}
                onDelete={onDeleteFoodAllergy}
                index={item.index}
              />
            }
          />
        </ScrollView>
      </View>}
      <TouchableOpacity
        style={[styles.addCircle, styles.marginVertical]}
        activeOpacity={0.2}
        onPress={onAddFoodAllergy}
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
  marginVertical: {
    marginVertical: Moderate_Units.p_10,
  }
});

export default RegistrationFoodAllergy;
