import React from "react";

import { View, Text, StyleSheet } from "react-native";

export default function Statement({ statement }) {
    return (
        <View style={styles.statementContainer}>
            <Text style={styles.type}>Type: {statement?.type}</Text>
            <Text style={styles.value}>Value: {statement?.value}</Text>
            <Text style={styles.date}>Date: {statement?.date}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    statementContainer: {
        backgroundColor: "#474743",
        justifyContent: "space-between",
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        marginBottom: 5,
    },
    type: {
        color: "white",
        fontSize: 24,
    },
    value: {
        color: "white",
        fontSize: 22,
    },
    date: {
        color: "white",
        fontSize: 20,
    },
});
