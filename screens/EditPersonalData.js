import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import GoBack from "../components/GoBack";
import Subtitle from "../components/Subtitle";
import { Color, Moderate_Units } from "../GlobalStyles";
import InputField from "../components/InputField";
import DateInputField from "../components/DateInputField";
import SubmitButton from "../components/SubmitButton";
import { useAuth } from "../context/AuthProvider";
import { putRequest } from "../api/api";

const EditPersonalData = () => {
  //LOGIN CONTEXT
  const { user, setUser, userId } = useAuth();

  const [userData, setUserData] = useState(user);

  const navigation = useNavigation();

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
      navigation.goBack();
    });
  };

  const updateUserData = async () => {
    try {
      const firstResponse = await putRequest(`/user/${userId}`, userData);
      const secondResponse = await putRequest(`/user/${userId}/address`, userData.personalAddress);

      firstResponse.status == 200 && secondResponse.status == 200 && setUser(userData);  
    } catch (error) {
      console.log("Error updating user data: ");
      console.log(error.response);
    }
  };

  return (
    <View style={styles.page}>
      <GoBack
        goBackTitle="Personal data"
        onFrameGoBackPress={() => navigation.goBack()}
        back={require("../assets/back-grey.png")}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.frameScrollViewContent}
      >
        <Subtitle text="Keep your data always updated" />
        <View>
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
          <SubmitButton text={"Update date"} onPressButton={handleSubmitButton} />
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
});

export default EditPersonalData;
