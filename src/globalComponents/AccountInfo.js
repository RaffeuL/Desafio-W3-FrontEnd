import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function AccountInfo({ showName = false }) {
    const account = useSelector((state) => state.account);
    const navigation = useNavigation();

    useEffect(() => {
        async function trigger() {
            if (!account) {
                await AsyncStorage.clear();
                navigation.replace("LogIn");
            }
        }

        trigger();
    });

    return (
        <View style={styles.container}>
            {showName && (
                <Text
                    style={styles.userName}
                >{`Welcome,\n${account?.client?.name}`}</Text>
            )}
            <View>
                <Text style={styles.balanceTitle}>Balance</Text>
                <Text style={styles.balance}>{`$ ${account?.balance}`}</Text>
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
