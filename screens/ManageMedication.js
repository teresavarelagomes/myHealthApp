import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import GoBack from "../components/GoBack";
import Subtitle from "../components/Subtitle";
import MedicationManagementList from "../components/MedicationManagementList";
import { Color, Moderate_Units } from "../GlobalStyles";
import PencilEditButton from "../components/PencilEditButton";
import { useAuth } from "../context/AuthProvider";
import { deleteRequest, getAllItems } from "../api/api";
import { useMedication } from "../context/MedicationProvider";
import LoadingSpinner from "../components/LoadingSpinner";

const ManageMedication = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const { userId } = useAuth();
  const { getNextMedication } = useMedication();

  const [medication, setMedication] = useState([]);
  const [deletable, setDeletable] = useState(false);
  const [editable, setEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isFocused) {
      getMedication().then(() => {
        getNextMedication();
        setIsLoading(false);
      });
    }
  }, [isFocused]);

  const getMedication = async () => {
    try {
      const response = await getAllItems(`/user/${userId}/medication`);
      setMedication(response);
    } catch (error) {
      console.log("Error getting medication: ");
      console.log(error.response);
    }
  };

  const handleAddClick = () => {
    navigation.navigate("AddUserMedication")
  };

  const handleGarbageClick = () => {
    setDeletable(!deletable);
    setEditable(!editable);
  };

  const handlePencilClick = () => {
    setEditable(!editable);
    if (deletable) {
      setDeletable(!deletable);
    }
  };

  const onDeleteHandler = (id) => {
    deleteMedication(id).then((success) => {
      if (success) {
        const newList = medication.filter((item) => item.id !== id);
        setMedication(newList);
        getNextMedication();
      }
    });
  };

  const deleteMedication = async (id) => {
    try {
      const response = await deleteRequest(`/user/${userId}/medication/${id}`);
      return response.status == 200;
    } catch (error) {
      console.log("Error deleting medication: ");
      console.log(error.response);
    }
  };

  return (
    <View style={[styles.page, styles.parentShadowBox]}>
        <View style={styles.frameGoBackParent}>
          <GoBack
            goBackTitle="Manage medication"
            onFrameGoBackPress={() => navigation.goBack()}
            back={require("../assets/back-grey.png")}
          />
          <Subtitle text="Manage your medication" />
          {isLoading ? <LoadingSpinner /> : <View style={styles.content}>
            <View style={[styles.whiteBubble, styles.parentBox]}>
              <MedicationManagementList 
                data={medication} 
                isDeleteAvailable={deletable} 
                onDeleteHandler={onDeleteHandler}
              />
            </View>
            <PencilEditButton 
              clicked={editable} 
              garbageEnabled={medication?.length > 0}
              onAddClick={handleAddClick} 
              onGarbageClick={handleGarbageClick}
              onPencilClick={handlePencilClick}
            />
          </View>}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "column",
  },
  parentBox: {
    marginTop: Moderate_Units.p_10,
    alignSelf: "stretch",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
        shadowColor: "rgba(0, 0, 0, 0.10)",
  },
  whiteBubble: {
    justifyContent: "center",
    padding: Moderate_Units.p_10,
    marginTop: Moderate_Units.p_10,
    borderRadius: Moderate_Units.p_20,
    backgroundColor: Color.colorWhite,
  },
  parentShadowBox: {
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  frameGoBackParent: {
    alignSelf: "stretch",
    paddingBottom: Moderate_Units.p_55,
  },
  page: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    flex: 1,
    backgroundColor: Color.veryLightGrey,
    paddingHorizontal: Moderate_Units.p_16,
    paddingVertical: Moderate_Units.p_40,
  },
});

export default ManageMedication;
