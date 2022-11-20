import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Button({ label, onPress }) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: "55%",
        height: 60,
        alignSelf: "center",
        borderWidth: 2,
        borderRadius: 8,
        marginVertical: 12,
        backgroundColor: "#FFB400",
        justifyContent: "center",
    },
    text: {
        color: "#232323",
        fontSize: 16,
        lineHeight: 26,
        fontWeight: "bold",
        alignSelf: "center",
    },
});
