import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import GoBack from "../components/GoBack";
import { FontFamily, FontSize, Color, Moderate_Units } from "../GlobalStyles";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import { getRequest, postRequest } from "../api/api";
import { useBiometric } from "../context/BiometricProvider";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../context/AuthProvider";
import { calculateImc, generateBiometricPayload, getBiometricUrl } from "../utils/biometric";
import Subtitle from "../components/Subtitle";

const AddManualWeightReading = () => {
    const navigation = useNavigation();

    const { userId } = useAuth();

    //BIOMETRIC CONTEXT
    const { weightData, getWeight } = useBiometric();

    const startingWeight = weightData?.length > 0 && weightData[0] !== undefined ? weightData[0].weightValue : '';

    const [stateLoading, setStateLoading] = useState(true);
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [isChanged, setIsChanged] = useState(false);
    const [isDataSent, setIsDataSent] = useState(false);

    const imc = calculateImc(height, weight);

    useEffect(() => {
        setWeight(startingWeight);
        getHeight().then(() => {
            setStateLoading(false);
        });
    }, []);

    const getHeight = async () => {
        try {
            const response = await getRequest(getBiometricUrl(userId, 'HEIGHT', 0, 1));
            
            if (response.data.content?.length > 0 && response.data.content[0] !== undefined && response.data.content[0].value !== undefined) {
                setHeight(response.data.content[0].value.toString());
            }
        } catch (error) {
            console.log("Error getting height: ");
            console.log(error.response);
        }
    };

    const handleSubmitButton = () => {
        updateHealthData().then((success) => {
            if (success) {
                getWeight();
                setIsDataSent(true);
            }
        });
    };

    const closeModal = () => {
        setIsDataSent(false);
    };

    async function updateHealthData() {
        try {
            const biometricRequests = [
                updateBiometric(height, "HEIGHT"),
                updateBiometric(weight, "WEIGHT"),
                updateBiometric(imc, "BMI"),
            ];

            const responses = await Promise.all(biometricRequests);
            return responses.every(response => response.status === 200);
        } catch (error) {
            console.log("Error creating health data:", error);
            return false;
        }
    };

    const updateBiometric = async (value, biometricType) => {
        try {
            return await postRequest(`/user/${userId}/bioMetric`, generateBiometricPayload(value, biometricType));
        } catch (error) {
            console.log("Error updating biometric: ");
            console.log(error.response);
        }
    };

    const handleHeightChange = (value) => {
        !isChanged && setIsChanged(true);
        setHeight(value);
    };

    const handleWeightChange = (value) => {
        !isChanged && setIsChanged(true);
        setWeight(value);
    };

    return (
        <View style={styles.page}>
            <GoBack
                goBackTitle="Add manual reading"
                onFrameGoBackPress={() => navigation.navigate("TabBiometricScreens", { screen: "BiometricReadingSelection"})}
                back={require("../assets/back-grey.png")}
            />
            <Subtitle text={"These are your last recorded values. Enter a new weight reading."} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.frameScrollViewContent}
            >
                {stateLoading ? <LoadingSpinner /> :
                    <View>
                        <View>
                            <InputField
                                title={"Height (cm)"}
                                value={height}
                                onChangeText={handleHeightChange}
                                inputMode={"numeric"}
                            />
                            <InputField
                                title={"Weight (kg)"}
                                value={weight}
                                onChangeText={handleWeightChange}
                                inputMode={"numeric"}
                            />
                        </View>
                        <View style={styles.calculationParent}>
                            <View style={styles.imcParameterParent}>
                                <Text style={[styles.imcParameterText]}>
                                    BMI (kg/m2)
                                </Text>
                            </View>
                            <View style={styles.imcValueParent}>
                                <Text style={[styles.imcValueText]}>{imc}</Text>
                            </View>
                        </View>
                        {weight && height && isChanged && <View style={styles.marginTop}>
                            <SubmitButton text={"Add readings"} onPressButton={handleSubmitButton} />
                        </View>}
                    </View>}
            </ScrollView>
            <Modal
                animationType="fade"
                transparent={true}
                visible={isDataSent}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.successText}>Readings added successfully!</Text>
                        <View style={styles.okButton}>
                            <SubmitButton
                                text={"OK"}
                                onPressButton={closeModal}
                                textColor={Color.orange}
                                textSize={FontSize.fs_15}
                                color={Color.colorWhite}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
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
  inputParent: {
    marginTop: Moderate_Units.p_10,
  },
  imcParameterText: {
    fontSize: FontSize.fs_15,
    color: Color.darkGrey,
    fontFamily: FontFamily.subtitle,
    textAlign: "center",
  },
  calculationParent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginTop: Moderate_Units.p_10,
  },
  imcParameterParent: {
    borderTopLeftRadius: Moderate_Units.p_10,
    borderBottomLeftRadius: Moderate_Units.p_10,
    borderColor: Color.orange,
    borderTopWidth: Moderate_Units.p_05,
    borderBottomWidth: Moderate_Units.p_05,
    borderLeftWidth: Moderate_Units.p_05,
    padding: Moderate_Units.p_10,
    flex: 1,
  },
  imcValueText: {
    color: Color.veryLightGrey,
    fontSize: FontSize.fs_15,
    fontFamily: FontFamily.subtitle,
    textAlign: "center",
  },
  imcValueParent: {
    borderTopRightRadius: Moderate_Units.p_10,
    borderBottomRightRadius: Moderate_Units.p_10,
    borderColor: Color.orange,
    backgroundColor: Color.orange,
    borderTopWidth: Moderate_Units.p_05,
    borderBottomWidth: Moderate_Units.p_05,
    borderLeftWidth: Moderate_Units.p_05,
    padding: Moderate_Units.p_10,
    flex: 1,
  },
  marginTop: {
    marginTop: Moderate_Units.p_20,
  },
  modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
  },
  modalContent: {
      backgroundColor: Color.colorWhite,
      paddingTop: Moderate_Units.p_20,
      paddingHorizontal: Moderate_Units.p_20,
      borderRadius: Moderate_Units.p_10,
      alignItems: 'center',
  },
  okButton: {
      marginVertical: Moderate_Units.p_10,
  },
  successText: {
      fontFamily: FontFamily.subtitle,
      fontSize: FontSize.fs_16,
      color: Color.darkGrey,
  },
});

export default AddManualWeightReading;
