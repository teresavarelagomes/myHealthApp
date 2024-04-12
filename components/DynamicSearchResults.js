import React from "react";
import {
    FlatList,
    View,
    StyleSheet,
    Text
} from "react-native";
import { Color, FontSize, FontFamily, Moderate_Units } from "../GlobalStyles";

// The navigation route must either be unique and passed as "navigationRoute" or as a parameter in each "data" object
// This enables that each clickable item can navigate to a different screen

const DynamicSearchResults = ({ data, renderItem}) => {
    if (data?.length > 0) {
        return (
            <View style={styles.dynamicSearchResults}>
                <FlatList
                    scrollEnabled={false}
                    data={data}
                    renderItem={({item}) => renderItem(item)}
                />
            </View>
        )
    } else {
        return (<View style={styles.emptyMessageParent}>
            <Text style={styles.emptyMessage}>No results found. Write at least three letters.</Text>
        </View>)
    }
};

const styles = StyleSheet.create({
    dynamicSearchResults: {
        backgroundColor: Color.colorWhite,
        borderRadius: Moderate_Units.p_10,
        borderColor: Color.lightGrey,
        borderWidth: Moderate_Units.p_05,
        padding: Moderate_Units.p_10,
        flexDirection: "row",
        alignItems: "center",
    },
    emptyMessage: {
        fontSize: FontSize.fs_12,
        color: Color.lightGrey,
        textAlign: "left",
        fontFamily: FontFamily.subtitle,
    },
    emptyMessageParent: {
        marginTop: Moderate_Units.p_2,
    },
});

export default DynamicSearchResults;
