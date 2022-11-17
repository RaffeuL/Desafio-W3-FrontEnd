import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet } from "react-native";
import Card from "../../globalComponents/Card";
import Top from "../../globalComponents/Top";

export default function Home() {
    const navigation = useNavigation();

    return (
        <>
            <View style={styles.screen}>
                <View style={styles.tileCard}>
                    <Card
                        iconName={"card-giftcard"}
                        label={"Gift Card"}
                        onPress={() => console.log("gift card")}
                    />
                    <Card
                        iconName={"attach-money"}
                        label={"Transfer"}
                        onPress={() => console.log("transfer")}
                    />
                </View>
                <View style={styles.tileCard}>
                    <Card
                        iconName={"account-balance"}
                        label={"Bank Statement"}
                        onPress={() => console.log("bank statement")}
                    />
                    <Card
                        iconName={"logout"}
                        label={"Logout"}
                        onPress={() => console.log("logout")}
                    />
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: "#232323",
        height: "100%",
    },

    tileCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 16,
        marginVertical: 16,
    },
});
