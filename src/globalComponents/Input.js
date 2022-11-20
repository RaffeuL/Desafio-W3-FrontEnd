import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Input({ iconName, error, isHide = false, ...props }) {
    const [isFocused, setIsFocused] = useState(false);
    const [hide, setHide] = useState(isHide);

    return (
        <>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <View style={styles.field}>
                <MaterialCommunityIcons
                    name={iconName}
                    size={24}
                    color="white"
                />
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholderTextColor={"#FFB400"}
                    secureTextEntry={hide}
                    onFocus={() => {
                        onFocus();
                        setIsFocused(true);
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                    }}
                    {...props}
                />
                {iconName === "lock" && (
                    <MaterialCommunityIcons
                        name={hide ? "eye" : "eye-off"}
                        size={24}
                        color="white"
                        onPress={() => setHide(!hide)}
                    />
                )}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    field: {
        width: "90%",
        height: 50,
        marginVertical: 10,
        marginHorizontal: 12,
        borderWidth: 2,
        padding: 10,
        borderRadius: 8,
        borderColor: "#FFB400",
        alignItems: "center",
        flexDirection: "row",
    },

    input: {
        width: "80%",
        marginStart: "2%",
        color: "#FFB400",
    },
    errorText: {
        marginHorizontal: 12,
        color: "red",
    },
});
