import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function AccountInfo({ showName = false }) {
    const user = useSelector((state) => state.user);

    return (
        <View style={styles.container}>
            {showName && (
                <Text
                    style={styles.userName}
                >{`Bem vindo,\n${user.name}`}</Text>
            )}
            <View>
                <Text style={styles.balanceTitle}>Balance</Text>
                <Text style={styles.balance}>{`$ ${user.balance}`}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#474743",
        width: "90%",
        borderRadius: 10,
        padding: 10,
        marginVertical: 20,
        alignSelf: "center",
        justifyContent: "space-between",
    },
    userName: {
        color: "#FFB400",
        fontSize: 24,
        fontWeight: "bold",
        width: "100%",
        marginBottom: 25,
    },
    balanceTitle: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
    },
    balance: {
        color: "#FFB400",
        fontSize: 20,
    },
});
