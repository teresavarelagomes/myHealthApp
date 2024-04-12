import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GoBack from "../components/GoBack";
import { Color, FontFamily, FontSize, Moderate_Units } from "../GlobalStyles";
import ReportBloodPressureRegistries from "../components/ReportBloodPressureRegistries";
import ReportTable from "../components/ReportTable";
import { scale } from 'react-native-size-matters';
import { useBiometric } from "../context/BiometricProvider";
import { getRequest } from "../api/api";
import { getBiometricUrl, getBloodPressureArraysDataAndSetState } from "../utils/biometric";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../context/AuthProvider";

const widthArr = [scale(80), scale(60), scale(78), scale(100)];
const itemsPerPage = 20;
const tableHead = [
  ['Date', 'Time', 'Blood Pressure (mmHg)', 'Heart Rate (bpm)']
];

const ReportBloodPressure = () => {
  const navigation = useNavigation();

  const [loadingReportData, setLoadingReportData] = useState(true);
  const [reportData, setReportData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const { userId } = useAuth();

  //BIOMETRIC CONTEXT
  const { bloodPressureData } = useBiometric();

  useEffect(() => {
    getData(0).then(() => {
      setLoadingReportData(false);
      console.log('loading report data to false');
    });
  }, []);

  const getData = async (page) => {
    try {
      const systolicResponse = await getRequest(getBiometricUrl(userId, 'SYSTOLIC_BLOOD_PRESSURE', page, itemsPerPage));
      const diastolicResponse = await getRequest(getBiometricUrl(userId, 'DIASTOLIC_BLOOD_PRESSURE', page, itemsPerPage));
      const heartRateResponse = await getRequest(getBiometricUrl(userId, 'HEART_RATE', page, itemsPerPage));

      getBloodPressureArraysDataAndSetState(systolicResponse.data.content, diastolicResponse.data.content, heartRateResponse.data.content, [], setReportData);
      setTotalItems(systolicResponse.data.totalElements);
    } catch (error) {
      console.log("Error getting health data: ");
      console.log(error.response);
    }
  };

  const onPageChangeHandler = (newPage) => {
    getData(newPage);
  };

  const LastRegistries = () => (
    <View style={[styles.whiteBubble, styles.parentBox]}>
      <Text style={[styles.darkGreyFont, styles.subtitle]}>
        Last records
      </Text>
      <ReportBloodPressureRegistries
        bloodPressure={`${bloodPressureData[0].systolicValue}/${bloodPressureData[0].diastolicValue}`}
        heartRate={bloodPressureData[0].heartRateValue}
      />
    </View>
  );

  return (
    <View style={styles.page}>
      <GoBack
        goBackTitle="Blood Pressure Report"
        onFrameGoBackPress={() => navigation.goBack()}
        back={require("../assets/back-grey.png")}
      />
      <View style={styles.frameReports}>
        {bloodPressureData?.length > 0 ?
          <View style={{ flex: 1 }}>
            <LastRegistries />
            {loadingReportData ? <LoadingSpinner /> : <ReportTable
              tableHead={tableHead}
              tableData={reportData}
              widthArr={widthArr}
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
              onPageChange={onPageChangeHandler}
            />}
          </View> :
          <View style={[styles.lastRecordsParent, styles.parentShadowBox]}>
            <Text style={styles.emptyMessage}>No records to show. First add measurements.</Text>
          </View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    paddingTop: Moderate_Units.p_40,
    paddingBottom: Moderate_Units.p_5,
    paddingHorizontal: Moderate_Units.p_16,
    backgroundColor: Color.veryLightGrey,
    flex: 1,
  },
  emptyMessage: {
    fontSize: FontSize.fs_12,
    color: Color.lightGrey,
    textAlign: "left",
    fontFamily: FontFamily.subtitle,
  },
  frameReports: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    flex: 1,
  },
  frameGoBackParent: {
    paddingBottom: Moderate_Units.p_55,
  },
  whiteBubble: {
    justifyContent: "center",
    padding: Moderate_Units.p_10,
    marginTop: Moderate_Units.p_10,
    borderRadius: Moderate_Units.p_20,
    backgroundColor: Color.colorWhite,
  },
  parentBox: {
    marginTop: Moderate_Units.p_10,
    alignSelf: "stretch",
    elevation: 4,
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.10)",
  },
  darkGreyFont: {
    color: Color.darkGrey,
  },
  subtitle: {
    fontSize: FontSize.fs_16,
    fontFamily: FontFamily.subtitle,
  },
  frameParent: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: Color.veryLightGrey,
    paddingHorizontal: Moderate_Units.p_16,
    paddingVertical: Moderate_Units.p_40,
    alignItems: "center",
    position: "absolute",
  },
  reportBloodPressure: {
    width: "100%",
    height: 667,
    flex: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowColor: "rgba(0, 0, 0, 0.10)",
    backgroundColor: Color.colorWhite,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  lastRecordsParent: {
    justifyContent: "center",
    padding: Moderate_Units.p_10,
    marginTop: Moderate_Units.p_10,
    borderRadius: Moderate_Units.p_10,
    backgroundColor: Color.colorWhite,
  },
  leftsubtitle: {
    fontSize: FontSize.fs_16,
    textAlign: "left",
    fontFamily: FontFamily.subtitle,
    color: Color.darkGrey,
  },
  parentShadowBox: {
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.10)",
  },
});

export default ReportBloodPressure;
