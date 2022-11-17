import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

export default function Top({ onPress }) {
    return (
        <View style={styles.top}>
            <MaterialIcons
                name="arrow-back"
                size={24}
                color="white"
                onPress={onPress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    top: {
        backgroundColor: "black",
        flexDirection: "row",
        marginVertical: 16,
        height: 40,
        alignItems: "center",
        borderBottomEndRadius: 10,
    },
});
