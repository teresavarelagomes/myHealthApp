import React from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    View
} from "react-native";
import CustomCheckBox from "./CustomCheckBox";
import { FontFamily, Color, FontSize, Moderate_Units } from "../GlobalStyles";
import { useMedication } from "../context/MedicationProvider";
import { postRequest } from "../api/api";
import { generateMedicationTakePayload } from "../utils/medication";
import { useAuth } from "../context/AuthProvider";

const DisplayNextMedication = ( {medication} ) => {

    const { getNextMedication } = useMedication();
    const { userId } = useAuth();

    const onCheckingHandler = (id) => {
        takeMedication(id).then((success) => {
            success && getNextMedication();
        });
    };

    const takeMedication = async (medicationId) => {
        try {
            const response = await postRequest(`/user/${userId}/medication/${medicationId}/take`, generateMedicationTakePayload(''));
            return response.status === 200;
        } catch (error) {
            console.log("Error taking medication: ");
            console.log(error);
        }
    };
    
    if (medication?.length > 0) {
        return (<FlatList
            scrollEnabled={false}
            data={medication}
            renderItem={({ item }) => <CustomCheckBox
                title={item.name}
                subtitle={item.time}
                onCheckboxSelection={() => onCheckingHandler(item.medicationId)}
                />
            }
            contentContainerStyle={styles.frameFlatListContent}
        />);
    } else {
        return (<View style={styles.emptyMessageParent}>
            <Text style={styles.emptyMessage}>There is no medication to take</Text>
        </View>);
    }
};

const styles = StyleSheet.create({
    frameFlatListContent: {
        flexDirection: "column",
        marginTop: Moderate_Units.p_10,
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

export default DisplayNextMedication;