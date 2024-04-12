import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Subtitle from "../components/Subtitle";
import { Color, Moderate_Units } from "../GlobalStyles";
import InputField from "../components/InputField";
import DateInputField from "../components/DateInputField";
import Title from "../components/Title";
import SubmitButton from "../components/SubmitButton";
import { useAuth } from "../context/AuthProvider";
import { postRequest, putRequest } from "../api/api";

const RegistrationPersonalData = () => {
  const navigation = useNavigation();

  //LOGIN CONTEXT
  const { user, setUser, userId } = useAuth();

  const [userData, setUserData] = useState(user);

  const handleChange = (value, name) => {
    const [objectKey, field] = name.split('.'); // Splitting name to determine nested object

    if (field) {
      // If field exists, update nested object
      setUserData({
        ...userData,
        [objectKey]: {
          ...userData[objectKey],
          [field]: value
        }
      });
    } else {
      // If field doesn't exist, update value directly
      setUserData({
        ...userData,
        [name]: value
      });
    }
  };

  const handleSubmitButton = () => {
    updateUserData().then(() => {
      navigation.navigate("RegistrationHealthProblems")
    });
  };

  const updateUserData = async () => {
    try {
      const firstResponse = await putRequest(`/user/${userId}`, userData);
      const secondResponse = await postRequest(`/user/${userId}/address`, userData.personalAddress);

      firstResponse.status == 200 && secondResponse.status == 200 && setUser(userData);  
    } catch (error) {
      console.log("Error update user personal data: ");
      console.log(error.response);
    }
  };

  return (
    <View style={styles.page}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.frameScrollViewContent}
      >
        <Title text={"Personal data"} />
        <Subtitle text="To complete your profile setup, fill in the following fields:" />
        <View style={styles.marginTop}>
          <InputField
            title={"Full name"}
            value={userData.name}
            name={"name"}
            onChangeText={handleChange}
            autoComplete={"family-name"}
          />
          <DateInputField
            title={"Date of birth"}
            value={userData.dob}
            name={"dob"}
            onChangeText={handleChange}
          />
          <InputField
            title={"Address"}
            name={"personalAddress.streetName"}
            value={userData.personalAddress.streetName}
            autoComplete={"address-line1"}
            onChangeText={handleChange}
          />
          <InputField
            title={"Postal code"}
            value={userData.personalAddress.postalCode}
            inputMode={"numeric"}
            autoComplete={"postal-code"}
            placeholder={"1234-567"}
            name={"personalAddress.postalCode"}
            onChangeText={handleChange}
          />
          <InputField
            title={"City"}
            value={userData.personalAddress.county}
            name={"personalAddress.county"}
            onChangeText={handleChange}
          />
          <InputField
            title={"National healthcare number"}
            value={userData.snsNumber}
            inputMode={"numeric"}
            name={"snsNumber"}
            onChangeText={handleChange}
          />
          <InputField
            title={"Tax Identification Number"}
            value={userData.nif}
            inputMode={"numeric"}
            name={"nif"}
            onChangeText={handleChange}
          />
          <InputField
            title={"Cellphone number"}
            value={userData.cellphoneNumber}
            inputMode={"numeric"}
            autoComplete={"tel"}
            name={"cellphoneNumber"}
            onChangeText={handleChange}
          />
        </View>
        <View style={styles.marginTop}>
          <SubmitButton text={"Submit"} onPressButton={handleSubmitButton} />
        </View>
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
    paddingTop: Moderate_Units.p_40,
    display: "flex",
    flexDirection: "column",
  },
  frameScrollViewContent: {
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingBottom: Moderate_Units.p_20,
  },
  marginTop: {
    marginTop: Moderate_Units.p_10,
  },
});

export default RegistrationPersonalData;
