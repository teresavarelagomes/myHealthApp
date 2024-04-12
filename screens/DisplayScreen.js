import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import DisplayScreenRegistries from "../components/DisplayScreenRegistries";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Moderate_Units } from "../GlobalStyles";
import DisplayNextMedication from "../components/DisplayNextMedication";
import DisplayTodayTasks from "../components/DisplayTodayTasks";
import Chart from "../components/Chart";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useAuth } from "../context/AuthProvider";
import { useBiometric } from "../context/BiometricProvider";
import { useHealthProgram } from '../context/HealthProgramProvider';
import { getRequest } from "../api/api";
import { useMedication } from "../context/MedicationProvider";
import LoadingSpinner from "../components/LoadingSpinner";
import { useTasks } from "../context/TaksProvider";
import { useNotification } from "../context/NotificationProvider";

const greetings = ["Good morning", "Good afternoon", "Good evening"];

const DisplayScreen = () => {
  const navigation = useNavigation();

  //STATE
  const [hours, setHours] = useState('');
  const [motivationalText, setMotivationalText] = useState('');
  const grettingMsg = hours < 12 ? greetings[0] : hours >= 19 ? greetings[2] : greetings[1];

  //LOGIN CONTEXT
  const { user, userId } = useAuth();
  const { healthProgramId, userHealthProgramId, healthProgramDay } = useHealthProgram();
  const firstName = user?.name?.split(" ")[0];

  //MEDICATION CONTEXT
  const { dailyMedication, isMedicationLoading } = useMedication();

  //DAILY TASKS
  const { tasks, isTasksLoading } = useTasks();

  //NOTIFICATIONS
  const { hasNewNotifications } = useNotification();

  //BIOMETRIC CONTEXT
  const { weightData, bloodPressureData } = useBiometric();

  useEffect(() => {
    setHours(new Date().getHours());
  });

  useEffect(() => {
    getMotivationalMessage();
  }, []);

  const getMotivationalMessage = async () => {
    try {
      const response = await getRequest(`/user/${userId}/healthProgram/${userHealthProgramId}/motivational_message`);
      response.data?.length > 0 && setMotivationalText(response.data[0].message);
    } catch (error) {
      console.log("Error getting motivational: ");
      console.log(error.response);
    }
  };

  const GreetingsBar = () => (
    <View style={[styles.greetingFlexBox]}>
      <View style={styles.greetingTextParent}>
        <Text style={styles.greetingText}>
          {grettingMsg} {firstName}
        </Text>
      </View>
      <View>
        <TouchableOpacity
          activeOpacity={0.2}
          onPress={() => navigation.navigate("Notifications")}
        >
          <Image
            style={styles.iconSize}
            contentFit="cover"
            source={require("../assets/alarm.png")}
          />
          {hasNewNotifications && <Image
            style={styles.newNotification}
            contentFit="cover"
            source={require("../assets/ellipse_red.png")}
          />}
        </TouchableOpacity>
      </View>
    </View>
  );

  const MotivationalBubble = () => (
    <TouchableOpacity
      activeOpacity={0.2}
      onPress={() => navigation.navigate("MotivationalMessage", {
        message: motivationalText,
      })}
    >
      <View
        style={[
          styles.yellowBubble,
          styles.parentBox,
        ]}
      >
        <Text
          style={[styles.motivationText]}
          numberOfLines={3}
        >
          {motivationalText}
        </Text>

        <Image
          style={styles.iconSize}
          contentFit="cover"
          source={require("../assets/add.png")}
        />
      </View>
    </TouchableOpacity>
  );

  const LastRegistries = () => (
    <View style={[styles.whiteBubble, styles.parentBox]}>
      <Text style={[styles.darkGreyFont, styles.subtitle]}>
        Last records
      </Text>
      <DisplayScreenRegistries
        bloodPressure={`${bloodPressureData[0].systolicValue}/${bloodPressureData[0].diastolicValue}`}
        heartRate={bloodPressureData[0].heartRateValue}
        weight={weightData[0].weightValue}
        imc={weightData[0].imcValue}
      />
    </View>
  )

  const NextMedication = () => (
    <View style={[styles.whiteBubble, styles.parentBox]}>
      <Text style={[styles.darkGreyFont, styles.subtitle]}>
        Next medication
      </Text>
      {isMedicationLoading ? <LoadingSpinner /> : <DisplayNextMedication medication={dailyMedication} />}
    </View>
  )

  const ContentButtons = () => (
    <View style={[styles.buttonsDisplay]}>
      <TouchableOpacity
        style={styles.buttonParent}
        activeOpacity={0.2}
        onPress={() => navigation.navigate("HealthPlans")}
      >
        <Image
          style={styles.iconSize}
          contentFit="cover"
          source={require("../assets/plan_white.png")}
        />
        <Text style={[styles.buttonWhiteFont, styles.subtitle]}>
          Health Plan
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={([styles.buttonParent, styles.marginLeft])}
        activeOpacity={0.2}
        onPress={() => navigation.navigate("Comunity")}
      >
        <Image
          style={styles.iconSize}
          contentFit="cover"
          source={require("../assets/comunity_white.png")}
        />
        <Text style={[styles.buttonWhiteFont, styles.subtitle]}>
          Comunity
        </Text>
      </TouchableOpacity>
    </View>
  )

  const TodayTasks = () => (
    <View style={[styles.whiteBubble, styles.parentBox]}>
      <Text style={[styles.darkGreyFont, styles.subtitle]}>
        Tasks for today
      </Text>
      {isTasksLoading ? <LoadingSpinner /> : <DisplayTodayTasks data={tasks} />}
    </View>
  );

  const Measurements = () => (
    <View style={[styles.whiteBubble, styles.parentBox]}>
      <Text style={[styles.darkGreyFont, styles.subtitle, styles.marginBottom]}>
        Last measurements
      </Text>
      {bloodPressureData?.length > 0 && <Chart
        title={"Blood Pressure"}
        xData={getBloodPressureDates()}
        yData={getBloodPressureMeasurements()}
        width={scale(400)}
        height={verticalScale(200)}
      />}
      {bloodPressureData?.length > 0 && <Chart
        title={"Heart Rate"}
        xData={getBloodPressureDates()}
        yData={getHeartRateMeasurements()}
        width={scale(400)}
        height={verticalScale(200)}
      />}
      {weightData?.length > 0 && <Chart
        title={"Weight"}
        xData={getWeightMeasurementDates()}
        yData={getWeightMeasurements()}
        width={scale(400)}
        height={verticalScale(200)}
      />}
      {weightData?.length > 0 && <Chart
        title={"BMI"}
        xData={getWeightMeasurementDates()}
        yData={getImcMeasurements()}
        width={scale(400)}
        height={verticalScale(200)}
      />}
    </View>
  )

  function getWeightMeasurements() {
    const newArray = [];
    weightData.map((weight) => {
      newArray.push(weight.weightValue);
    });
    return [{ data: newArray }];
  };

  function getImcMeasurements() {
    const newArray = [];

    weightData.map((weight) => {
      newArray.push(weight.imcValue);
    });
    return [{ data: newArray }];
  };

  function getWeightMeasurementDates() {
    const newArray = [];
    weightData.map((weight) => {
      newArray.push(weight.date);
    });
    return newArray;
  };

  function getHeartRateMeasurements() {
    const newArray = [];
    bloodPressureData.map((bloodPressure) => {
      newArray.push(bloodPressure.heartRateValue);
    });
    return [{ data: newArray }];
  };

  function getBloodPressureMeasurements() {
    const systolicArray = [];
    const diastolicArray = [];
    bloodPressureData.map((bloodPressure) => {
      systolicArray.push(bloodPressure.systolicValue);
      diastolicArray.push(bloodPressure.diastolicValue);
    });
    return [{ data: systolicArray }, { data: diastolicArray }];
  };

  function getBloodPressureDates() {
    const newArray = [];
    bloodPressureData.map((bloodPressure) => {
      newArray.push(bloodPressure.date);
    });
    return newArray;
  };

  return (
    <View style={styles.displayPageParent}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.frameScrollViewContent}
      >
        <GreetingsBar />
        {motivationalText && <MotivationalBubble />}
        <TodayTasks />
        <NextMedication />
        {weightData?.length > 0 && bloodPressureData?.length > 0 && <LastRegistries />}
        {(weightData?.length > 0 || bloodPressureData?.length > 0) && <Measurements />}
        <ContentButtons />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  marginLeft: {
    marginLeft: Moderate_Units.p_5,
  },
  marginBottom: {
    marginBottom: Moderate_Units.p_15
  },
  frameScrollViewContent: {
    paddingBottom: Moderate_Units.p_10,
  },
  greetingFlexBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: Moderate_Units.p_2,
  },
  greetingTextParent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1
  },
  greetingText: {
    fontFamily: FontFamily.subtitle,
    fontSize: FontSize.fs_22,
    color: Color.darkGrey,
  },
  parentBox: {
    marginTop: Moderate_Units.p_15,
    elevation: 4,
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.10)",
  },
  subtitle: {
    fontSize: FontSize.fs_16,
    fontFamily: FontFamily.subtitle,
  },
  iconSize: {
    height: Moderate_Units.p_20,
    width: Moderate_Units.p_20,
  },
  buttonParent: {
    paddingVertical: Moderate_Units.p_15,
    paddingHorizontal: Moderate_Units.p_10,
    justifyContent: "center",
    backgroundColor: Color.yellow,
    borderRadius: Moderate_Units.p_50,
    alignItems: "center",
    flex: 1,
  },
  motivationText: {
    color: Color.colorWhite,
    fontSize: FontSize.fs_16,
    textAlign: "left",
    fontFamily: FontFamily.subtitle,
    alignSelf: "stretch",
    overflow: "hidden",
    flex: 1,
  },
  yellowBubble: {
    padding: Moderate_Units.p_10,
    borderRadius: Moderate_Units.p_30,
    backgroundColor: Color.yellow,
    flexDirection: "row",
    alignItems: "center",
  },
  darkGreyFont: {
    color: Color.darkGrey,
  },
  whiteBubble: {
    paddingVertical: Moderate_Units.p_10,
    paddingHorizontal: Moderate_Units.p_10,
    borderRadius: Moderate_Units.p_20,
    backgroundColor: Color.colorWhite,
  },
  buttonWhiteFont: {
    color: Color.colorWhite,
    textAlign: "center"
  },
  buttonsDisplay: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: Moderate_Units.p_15,
    elevation: 4,
  },
  displayPageParent: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    paddingTop: Moderate_Units.p_40,
    paddingHorizontal: Moderate_Units.p_16,
    backgroundColor: Color.veryLightGrey,
  },
  newNotification: {
    position: "absolute",
    top: moderateScale(-1),
    right: moderateScale(0),
    width: moderateScale(7),
    height: moderateScale(7),
    zIndex: 1,
  },
});

export default DisplayScreen;
