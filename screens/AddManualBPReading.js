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
import { postRequest } from "../api/api";
import { useBiometric } from "../context/BiometricProvider";
import { useAuth } from "../context/AuthProvider";
import { generateBiometricPayload } from "../utils/biometric";
import Subtitle from "../components/Subtitle";

const AddManualBPReading = () => {
    const navigation = useNavigation();

    const { userId } = useAuth();

    //BIOMETRIC CONTEXT
    const { bloodPressureData, getBloodPressure } = useBiometric();

    const startingSystolic = bloodPressureData?.length > 0 && bloodPressureData[0] !== undefined ? bloodPressureData[0].systolicValue : '';
    const startingDiastolic = bloodPressureData?.length > 0 && bloodPressureData[0] !== undefined ? bloodPressureData[0].diastolicValue : '';
    const startingHeartRate = bloodPressureData?.length > 0 && bloodPressureData[0] !== undefined ? bloodPressureData[0].heartRateValue : '';

    const [systolic, setSystolic] = useState('');
    const [diastolic, setDiastolic] = useState('');
    const [heartRate, setHeartRate] = useState('');
    const [isChanged, setIsChanged] = useState(false);
    const [isDataSent, setIsDataSent] = useState(false);

    useEffect(() => {
        setSystolic(startingSystolic);
        setDiastolic(startingDiastolic);
        setHeartRate(startingHeartRate);
    }, []);

    const handleSubmitButton = () => {
        updateHealthData().then((success) => {
            if (success) {
                getBloodPressure();
                setIsDataSent(true);
            };
        });
    };

    const closeModal = () => {
        setIsDataSent(false);
    };

    async function updateHealthData() {
        try {
            const biometricRequests = [
                updateBiometric(systolic, "SYSTOLIC_BLOOD_PRESSURE"),
                updateBiometric(diastolic, "DIASTOLIC_BLOOD_PRESSURE"),
                updateBiometric(heartRate, "HEART_RATE"),
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

    const handleSystolicChange = (value) => {
        !isChanged && setIsChanged(true);
        setSystolic(value);
    };

    const handleDiastolicChange = (value) => {
        !isChanged && setIsChanged(true);
        setDiastolic(value);
    };

    const handleHeartRateChange = (value) => {
        !isChanged && setIsChanged(true);
        setHeartRate(value);
    };

    return (
        <View style={styles.page}>
            <GoBack
                goBackTitle="Add manual reading"
                onFrameGoBackPress={() => navigation.navigate("TabBiometricScreens", { screen: "BiometricReadingSelection"})}
                back={require("../assets/back-grey.png")}
            />
            <Subtitle text={"These are your last recorded values. Enter the new blood pressure and heart rate readings."} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.frameScrollViewContent}
            >
                <View>
                    <View>
                        <InputField
                            title={"Systolic (mmHg)"}
                            value={systolic}
                            onChangeText={handleSystolicChange}
                            inputMode={"numeric"}
                        />
                        <InputField
                            title={"Diastolic (mmHg)"}
                            value={diastolic}
                            onChangeText={handleDiastolicChange}
                            inputMode={"numeric"}
                        />
                        <InputField
                            title={"Heart rate (bpm)"}
                            value={heartRate}
                            onChangeText={handleHeartRateChange}
                            inputMode={"numeric"}
                        />
                    </View>
                    {systolic && diastolic && heartRate && isChanged && <View style={styles.marginTop}>
                        <SubmitButton text={"Add readings"} onPressButton={handleSubmitButton} />
                    </View>}
                </View>
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

export default AddManualBPReading;