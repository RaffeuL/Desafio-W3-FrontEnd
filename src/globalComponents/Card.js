import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Card({ iconName, label, onPress }) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <MaterialIcons name={iconName} size={46} color="black" />
            <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#eb8334",
        height: 100,
        width: 150,
        alignItems: "center",
        borderRadius: 10,
        justifyContent: "center",
    },
    text: {
        color: "white",
        fontWeight: "bold",
    },
});
