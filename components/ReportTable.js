import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Color, FontFamily, FontSize, Moderate_Units } from "../GlobalStyles";
import { Table, Row, Rows } from 'react-native-table-component';
import { DataTable } from 'react-native-paper';

const ReportTable = ({
    tableHead,
    tableData,
    itemsPerPage,
    totalItems,
    widthArr,
    heightArr,
    onPageChange,
}) => {

    const [page, setPage] = useState(0);
    const from = page * itemsPerPage;
    const to = (page + 1) * itemsPerPage > totalItems ? totalItems : (page + 1) * itemsPerPage;

    const onClickPageChange = (page) => {
        setPage(page);
        onPageChange(page);
    };

    return (
        <View style={[styles.tableContainer]}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View>
                    <Table>
                        <Rows
                            data={tableHead}
                            widthArr={widthArr}
                            style={styles.head}
                            textStyle={styles.headText}
                        />
                    </Table>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Table style={styles.table}>
                            {tableData.map((rowData, index) => (
                                <Row
                                    key={index}
                                    widthArr={widthArr}
                                    style={styles.row}
                                    data={rowData}
                                    textStyle={styles.rowText}
                                />))}
                        </Table>
                    </ScrollView>
                </View>
            </ScrollView>
            <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(totalItems / itemsPerPage)}
                onPageChange={(page) => onClickPageChange(page)}
                label={`${from + 1}-${to} of ${totalItems}`}
                style={[styles.pagination, styles.parentBox]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    tableContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        flex: 1,
        marginTop: Moderate_Units.p_20,
        backgroundColor: Color.colorWhite,
        borderRadius: Moderate_Units.p_20,
    },
    table: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        flex: 1,
        backgroundColor: Color.colorWhite,
    },
    head: {
        backgroundColor: Color.colorWhite,
        borderTopEndRadius: Moderate_Units.p_20,
        borderTopStartRadius: Moderate_Units.p_20,
        borderColor: Color.lightOrange,
        borderBottomWidth: Moderate_Units.p_05,
        paddingVertical: Moderate_Units.p_2,
    },
    pagination: {
        backgroundColor: Color.colorWhite,
        borderBottomEndRadius: Moderate_Units.p_20,
        borderBottomStartRadius: Moderate_Units.p_20,
        borderColor: Color.lightOrange,
        borderTopWidth: Moderate_Units.p_05,
    },
    headText: {
        color: Color.orange,
        fontSize: FontSize.fs_14,
        fontFamily: FontFamily.subtitle,
        textAlign: "center",
    },
    row: {
        paddingVertical: Moderate_Units.p_8,
    },
    rowText: {
        color: Color.darkGrey,
        fontSize: FontSize.fs_13,
        fontFamily: FontFamily.subtitle,
        textAlign: "center",
    },
    parentBox: {
        elevation: 4,
        shadowOpacity: 1,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowColor: "rgba(0, 0, 0, 0.10)",
    },
});

export default ReportTable;
