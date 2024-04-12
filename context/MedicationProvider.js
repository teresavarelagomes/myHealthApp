import React, { createContext, useContext, useState, useEffect } from "react";
import { getAllItems } from "../api/api";
import { useAuth } from "./AuthProvider";
import { v4 as uuidv4 } from 'uuid';

const MedicationContext = createContext();

const MedicationProvider = ({ children }) => {

    const { userId } = useAuth();
    const [isMedicationLoading, setIsMedicationLoading] = useState(true);
    const [dailyMedication, setDailyMedication] = useState([]);

    useEffect(() => {
        if (userId) {
            getNextMedication().then(() => {
                setIsMedicationLoading(false);
            });
        }
    }, [userId]);

    const getNextMedication = async () => {
        try {
            const response = await getAllItems(`/user/${userId}/medication/day`);
            setDailyMedication(getDailyMedication(response));
        } catch (error) {
            console.log("Error getting health program: ");
            console.log(error.response);
        }
    };

    const getDailyMedication = (medication) => {
        const newArray = [];

        medication.forEach(item => {
            if (item.numberOfTakes > 1) {
                item.timeTakes.forEach((time) => {
                    newArray.push(
                        {
                            id: uuidv4(),
                            medicationId: item.id,
                            name: item.commercialName,
                            time
                        }
                    );
                }
                );
            } else {
                newArray.push(
                    {
                        id: uuidv4(),
                        medicationId: item.id,
                        name: item.commercialName,
                        time: item.timeTakes[0]
                    }
                );
            }
        });

        return newArray;
    };

    return (
        <MedicationContext.Provider value={{ dailyMedication, setDailyMedication, getNextMedication, isMedicationLoading }}>
            {children}
        </MedicationContext.Provider>
    );
};

export const useMedication = () => useContext(MedicationContext);

export default MedicationProvider;
