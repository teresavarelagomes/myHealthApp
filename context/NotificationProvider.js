import React, { createContext, useContext, useState, useEffect } from "react";
import { getAllItems } from "../api/api";
import { useAuth } from "./AuthProvider";
import { setNotificationStates } from "../utils/notification";

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
    const { userId } = useAuth();

    const [ isNotificationLoading, setIsNotificationLoading ] = useState(true);
    const [ notifications, setNotifications ] = useState([]);
    const [ hasNewNotifications, setHasNewNotifications ] = useState(false);

    useEffect(() => {
        if (userId) {
            getNotification().then(() => {
                setIsNotificationLoading(false);
            });    
        }
    }, [userId]);

    const getNotification = async () => {
        try {
            const response = await getAllItems(`/user/${userId}/notification`);
            if (response?.length > 0) {
                setNotificationStates(response, setNotifications, setHasNewNotifications);
            }
        } catch (error) {
            console.log("Error getting notifications: ");
            console.log(error);
        }
    };

    

    return (
        <NotificationContext.Provider value={{ isNotificationLoading, notifications, hasNewNotifications, getNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);

export default NotificationProvider;