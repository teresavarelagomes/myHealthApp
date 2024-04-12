import React from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    View
} from "react-native";
import CustomCheckBox from "./CustomCheckBox";
import { FontFamily, Color, FontSize, Moderate_Units } from "../GlobalStyles";
import { useHealthProgram } from "../context/HealthProgramProvider";
import { useTasks } from "../context/TaksProvider";
import { postRequest } from "../api/api";
import { useAuth } from "../context/AuthProvider";

const DisplayTodayTasks = ({ data }) => {

    const { getNextTasks } = useTasks();
    const { userId } = useAuth();
    const { userHealthProgramId } = useHealthProgram();

    const onCheckingHandler = (id) => {
        takeTask(id).then((success) => {
            success && getNextTasks();
        });
    };

    const takeTask = async (taskId) => {
        try {
            const response = await postRequest(`/user/${userId}/healthProgram/${userHealthProgramId}/task/${taskId}`, generateTaskTakePayload(''));
            return response.status === 200;
        } catch (error) {
            console.log("Error taking medication: ");
            console.log(error);
        }
    };

    const generateTaskTakePayload = (note) => {
        return {
            take: new Date(),
            note
        };
    };

    const renderItem = (item) => {
        const isEvent = item.categories[0].title === "Next events";
        const isPhysicalActivity = item.subTitle === "Physical activity";

        return (
            <View style={!isEvent && styles.marginBottom} >
                <CustomCheckBox
                    title={isPhysicalActivity ? `${item.title} - ${item.body}` : item.title}
                    subtitle={isEvent && `Today at ${item.activityTime}`}
                    onCheckboxSelection={() => onCheckingHandler(item.id)}
                />
            </View>
        );
    };

    if (data?.length > 0) {
        return (
            <FlatList
                scrollEnabled={false}
                data={data}
                renderItem={({ item }) => renderItem(item)}
                contentContainerStyle={styles.frameFlatListContent}
            />
        )
    } else {
        return (<View style={styles.emptyMessageParent}>
            <Text style={styles.emptyMessage}>There are no tasks for today.</Text>
        </View>)
    }
}

const styles = StyleSheet.create({
    frameFlatListContent: {
        flexDirection: "column",
        marginTop: Moderate_Units.p_10,
    },
    marginBottom: {
        marginBottom: Moderate_Units.p_8,
    },
    emptyMessage: {
        fontSize: FontSize.fs_12,
        color: Color.lightGrey,
        textAlign: "left",
        fontFamily: FontFamily.subtitle,
    },
    emptyMessageParent: {
        marginTop: Moderate_Units.p_2,
    }
});

export default DisplayTodayTasks;
