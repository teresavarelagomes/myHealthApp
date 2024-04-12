import { getPrettyDay } from "./date";

//notificationType is enum GENERIC, TASK, MEDICATION, TRAINING, DEVICES
export const getSourceIconNotification = ( notificationType, isRead ) => {
    switch (notificationType) {
        case 'GENERIC':
            return isRead ? require("../assets/plan_grey.png") : require("../assets/plan_red.png");
        case 'TASK':
            return isRead ? require("../assets/comunity_grey.png") : require("../assets/comunity_red.png");
        case 'MEDICATION':
            return isRead ? require("../assets/drug_grey.png") : require("../assets/drug_red.png");
        case 'TRAINING':
            return isRead ? require("../assets/plan_grey.png") : require("../assets/plan_red.png");
        case 'DEVICES':
            return isRead ? require("../assets/heart_grey.png") : require("../assets/heart_red.png");
        default:
            return isRead ? require("../assets/plan_grey.png") : require("../assets/plan_red.png");
    }
};

export const setNotificationStates = (notificationArray, setStateFunction, setNewItemStateFunction) => {
    const newArray = [];

    for (let i = 0; i < notificationArray.length; i++) {

        if (notificationArray[i] !== undefined && notificationArray[i].payload !== undefined) {
           
            const payload = JSON.parse(notificationArray[i].payload);

            !notificationArray[i].read && setNewItemStateFunction(true);

            newArray.push({
                notificationId: notificationArray[i].id,
                title: payload.notification.title,
                subtitle: payload.notification.body,
                date: getPrettyDay(payload.data.date),
                type: payload.data.type,
                action: payload.data.action,
                isRead: notificationArray[i].read,
                body: payload.data.body,
                videoUri: payload.data.videoUri,
                imageUri: payload.data.imageUri,
            });
        }
    };
    setStateFunction(newArray);
};