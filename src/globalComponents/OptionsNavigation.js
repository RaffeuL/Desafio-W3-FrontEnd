import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function OptionsNavigation() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text
                style={styles.text}
                onPress={() => navigation.navigate("TransferScreen")}
            >
                Transfer
            </Text>
            <Text
                style={styles.text}
                onPress={() => navigation.navigate("BankStatementScreen")}
            >
                Bank Statement
            </Text>
            <Text
                style={styles.text}
                onPress={() => navigation.navigate("GiftCardScreen")}
            >
                Gift Card
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginVertical: 10,
        width: "90%",
        alignSelf: "center",
    },
    text: {
        color: "#FFB400",
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        marginHorizontal: 5,
    },
});
