import React, { createContext, useContext, useState, useEffect } from "react";
import { getRequest } from "../api/api";
import { useAuth } from "./AuthProvider";
import { getDay } from "../utils/date";

const HealthProgramContext = createContext();

const HealthProgramProvider = ({ children }) => {
    const [healthProgramLoading, setHealthProgramLoading] = useState(true);
    const [userHealthProgramId, setUserHealthProgramId] = useState('');
    const [healthProgramId, setHealthProgramId] = useState('');
    const [healthProgramStartDate, setHealthProgramStartDate] = useState();
    const [healthProgramDay, setHealthProgramDay] = useState();
    const [isHealthProgramActive, setIsHealthProgramActive] = useState(false);
    const { userId } = useAuth();

    useEffect(() => {
        if (userId) {
            getHealthProgram().then(() => {
                setHealthProgramLoading(false);
            });
        }
    }, [userId]);

    const getHealthProgram = async () => {
        try {
            const response = await getRequest(`/user/${userId}/healthProgram`);
            if (response.data !== undefined && response.data.listOfUserHealthPrograms?.length > 0) {
                setUserHealthProgramId(response.data.id);
                getUserDefaultHealthProgram(response.data.listOfUserHealthPrograms);
            }
        } catch (error) {
            console.log("Error getting health program: ");
            console.log(error.response);
        }
    };

    const getUserDefaultHealthProgram = (healthPrograms) => {
        healthPrograms.map((userHealthProgram) => {
            if (userHealthProgram.healthProgram.defaultProgram === true) {
                setHealthProgramId(userHealthProgram.healthProgram.id);
                if (userHealthProgram.activationDate !== undefined) {
                    setHealthProgramStartDate(userHealthProgram.activationDate);
                    setHealthProgramDay(getDay(userHealthProgram.activationDate, new Date()))
                    setIsHealthProgramActive(true);
                }
            }
        });
    };

    return (
        <HealthProgramContext.Provider value={{ healthProgramId, setHealthProgramId, healthProgramLoading, healthProgramStartDate, getHealthProgram, isHealthProgramActive, setIsHealthProgramActive, getHealthProgram, userHealthProgramId, healthProgramDay }}>
            {children}
        </HealthProgramContext.Provider>
    );
};

export const useHealthProgram = () => useContext(HealthProgramContext);

export default HealthProgramProvider;
