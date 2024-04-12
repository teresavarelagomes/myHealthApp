import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getRequest } from "../api/api";
import { getBiometricUrl, getBloodPressureObjectArrayDataAndSetState, getWeightObjectArrayDataAndSetState } from "../utils/biometric";
import { useAuth } from "./AuthProvider";

const BiometricContext = createContext()

const BiometricProvider = ({ children }) => {

    const { userId } = useAuth();
    const [weightData, setWeightData] = useState([]);
    const [bloodPressureData, setBloodPressureData] = useState([]);
    const [stateLoading, setStateLoading] = useState(true);
    const [bloodPressureDeviceExists, setBloodPressureDeviceExists] = useState(true);
    const [weightDeviceExists, setWeightDeviceExists] = useState(false);
    const [bloodPressureDevice, setBloodPressureDevice] = useState({
        "name": "",
        "deviceId": "",
        "serviceId": "00001810-0000-1000-8000-00805f9b34fb",
        "characteristicId": "00002a35-0000-1000-8000-00805f9b34fb",

    });
    const [weightDevice, setWeightDevice] = useState({
        "name": "",
        "deviceId": "",
        "serviceId": "0000181d-0000-1000-8000-00805f9b34fb",
        "characteristicId": "00002A9D-0000-1000-8000-00805f9b34fb",
    });

    useEffect(() => {
        if (userId) {
            getData().then(() => {
                setStateLoading(false);
            });
        }
        fetchDevicesFromCache();
    }, [userId]);

    async function getData() {
        await getWeight();
        await getBloodPressure();
    };

    const getWeight = async () => {
        try {
            const weightResponse = await getRequest(getBiometricUrl(userId, 'WEIGHT', 0, 20));
            const imcResponse = await getRequest(getBiometricUrl(userId, 'IMC', 0, 20));

            getWeightObjectArrayDataAndSetState(weightResponse.data.content, imcResponse.data.content, [], setWeightData);
        } catch (error) {
            console.log("Error weight and imc: ");
            console.log(error);
        }
    };

    const getBloodPressure = async () => {
        try {
            
            const systolicResponse = await getRequest(getBiometricUrl(userId, 'SYSTOLIC_BLOOD_PRESSURE', 0, 20));
            const diastolicResponse = await getRequest(getBiometricUrl(userId, 'DIASTOLIC_BLOOD_PRESSURE', 0, 20));
            const heartRateResponse = await getRequest(getBiometricUrl(userId, 'HEART_RATE', 0, 20));

            getBloodPressureObjectArrayDataAndSetState(systolicResponse.data.content, diastolicResponse.data.content, heartRateResponse.data.content, [], setBloodPressureData);
        } catch (error) {
            console.log("Error systolc diastolic and heart rate: ");
            console.log(error.response);
        }
    };

    const fetchDevicesFromCache = async () => {
        try {
            const bpDevice = await AsyncStorage.getItem('bpDevice');
            const weightDevice = await AsyncStorage.getItem('weightDevice');

            if (bpDevice && weightDevice) {
                setBloodPressureDeviceExists(true);
                setWeightDeviceExists(true);
            }
        } catch (error) {
            console.error('Error fetching devices from AsyncStorage:', error);
        }
    };

    const deleteBloodPressureDeviceFromCache = async () => {
        await AsyncStorage.removeItem('bpDevice');
        setBloodPressureDeviceExists(false);
    };

    const deleteWeightDeviceFromCache = async () => {
        await AsyncStorage.removeItem('weightDevice');
        setWeightDeviceExists(false);
    };

    const addBloodPressureDeviceToCache = async (value) => {
        await AsyncStorage.setItem('bpDevice', value);
        setBloodPressureDeviceExists(true);
    };

    const addWeightDeviceToCache = async (value) => {
        await AsyncStorage.setItem('weightDevice', value);
        setBloodPressureDeviceExists(true);
    };

    return (
        <BiometricContext.Provider value={{
            weightData, setWeightData, bloodPressureData,
            setBloodPressureData, stateLoading, getWeight,
            getBloodPressure, fetchDevicesFromCache,
            bloodPressureDeviceExists, bloodPressureDevice,
            weightDeviceExists, weightDevice,
            addBloodPressureDeviceToCache, addWeightDeviceToCache,
            deleteBloodPressureDeviceFromCache, deleteWeightDeviceFromCache
        }}
        >
            {children}
        </BiometricContext.Provider>
    );
};

export const useBiometric = () => useContext(BiometricContext);

export default BiometricProvider;
