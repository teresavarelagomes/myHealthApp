import React, { useState } from "react";
import {
    View,
    ScrollView,
    StyleSheet,
} from "react-native";
import Subtitle from "../components/Subtitle";
import { Color, Moderate_Units } from "../GlobalStyles";
import InputField from "../components/InputField";
import Title from "../components/Title";
import SubmitButton from "../components/SubmitButton";
import RadioSelection from "../components/RadioSelection";
import { useAuth } from "../context/AuthProvider";
import { isValidObject } from "../utils/objects";
import { calculateImc, generateBiometricPayload } from "../utils/biometric";
import { postRequest } from "../api/api";
import { useHealthProgram } from "../context/HealthProgramProvider";

const radioSelectionOptions = [
    {
        "key": 0,
        "title": "No",
    },
    {
        "key": 1,
        "title": "Yes",
    },
];

const startingIndex = 0;

const getRadioAnswer = (key) => {
    let answer;
    radioSelectionOptions.forEach((item) => {
        if (item.key === key) {
            answer = item.title;
        }
    });
    return answer;
};

const AddUserHealthData = () => {
    const { getHealthProgram } = useHealthProgram();
    const { userId, setIsComplete } = useAuth();

    const [healthData, setHealthData] = useState({
        weight: '',
        height: '',
        systolic: '',
        diastolic: '',
        heartRate: '',
        smoker: getRadioAnswer(startingIndex),
        drinker: getRadioAnswer(startingIndex),
        exercise: getRadioAnswer(startingIndex),
        drugs: getRadioAnswer(startingIndex)
    });

    const handleChange = (value, name) => {
        setHealthData({
            ...healthData,
            [name]: value
        });
    };

    const onHandleSubmit = () => {
        createHealthData().then((success) => {
            if (success) {
                setIsComplete(true);
                getHealthProgram();
            }
        });
    };

    const createHealthData = async () => {
        try {
            const biometricRequests = [
                updateBiometric(healthData.height, "HEIGHT"),
                updateBiometric(healthData.weight, "WEIGHT"),
                updateBiometric(calculateImc(healthData.height, healthData.weight), "BMI"),
                updateBiometric(healthData.diastolic, "DIASTOLIC_BLOOD_PRESSURE"),
                updateBiometric(healthData.systolic, "SYSTOLIC_BLOOD_PRESSURE"),
                updateBiometric(healthData.heartRate, "HEART_RATE")
            ];

            const questionnaireRequests = [
                updateAnswer(healthData.smoker, "8addc4f0-e05e-11ec-9d64-0242ac120002"),
                updateAnswer(healthData.drinker, "2994cf5a-ad43-46cb-b326-6d42a6ac547e"),
                updateAnswer(healthData.exercise, "3c83aaf0-e268-49cf-8272-71d1d37675ae"),
                updateAnswer(healthData.drugs, "bbeb66bc-48ec-4277-8033-a599ed5e540c")
            ];

            const allRequests = [...biometricRequests, ...questionnaireRequests];

            const responses = await Promise.all(allRequests);

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
            console.log(error);
        }
    };

    const updateAnswer = async (answer, questionId) => {
        try {
            return await postRequest(`/user/${userId}/answer`, generateAnswerPayload(questionId, answer));
        } catch (error) {
            console.log("Error updating answer: ");
            console.log(error.response);
        }
    };

    const generateAnswerPayload = (questionId, answer) => {
        return {
            questionId,
            answer
        }
    };

    return (
        <View style={styles.page}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.frameScrollViewContent}
            >
                <Title text={"Health Data"} />
                <Subtitle text="To complete your profile setup, fill out the following fields:" />
                <View style={styles.marginTop}>
                    <InputField
                        title={"Height (cm)"}
                        inputMode={"numeric"}
                        placeholder={"170"}
                        value={healthData.height}
                        name={"height"}
                        onChangeText={handleChange}
                    />
                    <InputField
                        title={"Weight (kg)"}
                        inputMode={"numeric"}
                        placeholder={"80"}
                        value={healthData.weight}
                        name={"weight"}
                        onChangeText={handleChange}
                    />
                    <InputField
                        title={"Systolic blood pressure (mmHg)"}
                        inputMode={"numeric"}
                        value={healthData.systolic}
                        placeholder={"120"}
                        name={"systolic"}
                        onChangeText={handleChange}
                    />
                    <InputField
                        title={"Diastolic blood pressure (mmHg)"}
                        inputMode={"numeric"}
                        value={healthData.diastolic}
                        placeholder={"70"}
                        name={"diastolic"}
                        onChangeText={handleChange}
                    />
                    <InputField
                        title={"Heart rate (bpm)"}
                        inputMode={"numeric"}
                        value={healthData.heartRate}
                        placeholder={"55"}
                        name={"heartRate"}
                        onChangeText={handleChange}
                    />
                    <RadioSelection title={"Do you smoke?"} onChangeSelection={(selection) => handleChange(getRadioAnswer(selection), "smoker")} radioOptions={radioSelectionOptions} startingIndex={startingIndex} />
                    <RadioSelection title={"Do you consume alcoholic beverages?"} onChangeSelection={(selection) => handleChange(getRadioAnswer(selection), "drinker")} radioOptions={radioSelectionOptions} startingIndex={startingIndex} />
                    <RadioSelection title={"Do you exercise regularly?"} onChangeSelection={(selection) => handleChange(getRadioAnswer(selection), "exercise")} radioOptions={radioSelectionOptions} startingIndex={startingIndex} />
                    <RadioSelection title={"Do you consume drugs?"} onChangeSelection={(selection) => handleChange(getRadioAnswer(selection), "drugs")} radioOptions={radioSelectionOptions} startingIndex={startingIndex} />
                </View>
                <View style={styles.marginTop}>
                    {isValidObject(healthData) && <SubmitButton text={"Finish"} onPressButton={onHandleSubmit} />}
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

export default AddUserHealthData;
