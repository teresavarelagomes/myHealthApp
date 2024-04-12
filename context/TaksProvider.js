import React, { createContext, useContext, useState, useEffect } from "react";
import { getRequest } from "../api/api";
import { useAuth } from "./AuthProvider";
import { useHealthProgram } from "./HealthProgramProvider";

const TasksContext = createContext();

const TasksProvider = ({ children }) => {

    const { userId } = useAuth();
    const { userHealthProgramId } = useHealthProgram();
    const [isTasksLoading, setIsTasksLoading] = useState(true);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (userId && userHealthProgramId) {
            getNextTasks().then(() => {
                setIsTasksLoading(false);
            });          
        }
    }, [userId, userHealthProgramId]);

    const getNextTasks = async () => {
        try {
            const response = await getRequest(`/user/${userId}/healthProgram/${userHealthProgramId}/task/day`);
            response.data?.length > 0 && setTasks(response.data);
        } catch (error) {
            console.log("Error getting motivational: ");
            console.log(error.response);
        }
    };

    return (
        <TasksContext.Provider value={{ tasks, getNextTasks, isTasksLoading }}>
            {children}
        </TasksContext.Provider>
    );
};

export const useTasks = () => useContext(TasksContext);

export default TasksProvider;