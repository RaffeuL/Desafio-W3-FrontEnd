import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet } from "react-native";
import Card from "../../globalComponents/Card";

import { useDispatch } from "react-redux";
import { userLogout } from "../../services/userFeatures/auth";
import { logoutUser } from "../../store/user";
import AccountInfo from "../../globalComponents/AccountInfo";

export default function Home() {
    const navigation = useNavigation();
    const dispach = useDispatch();
    async function logout() {
        const response = await userLogout();
        if (response == "sucess") {
            dispach(logoutUser());
            navigation.replace("LogIn");
        }
    }

    return (
        <>
            <View style={styles.screen}>
                <AccountInfo showName={true} />
                <View style={styles.tileCard}>
                    <Card
                        iconName={"card-giftcard"}
                        label={"Gift Card"}
                        onPress={() => navigation.navigate("GiftCardScreen")}
                    />
                    <Card
                        iconName={"attach-money"}
                        label={"Transfer"}
                        onPress={() => navigation.navigate("TransferScreen")}
                    />
                </View>
                <View style={styles.tileCard}>
                    <Card
                        iconName={"account-balance"}
                        label={"Bank Statement"}
                        onPress={() =>
                            navigation.navigate("BankStatementScreen")
                        }
                    />
                    <Card
                        iconName={"logout"}
                        label={"Logout"}
                        onPress={logout}
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
        justifyContent: "center",
    },

    tileCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 16,
        marginVertical: 16,
    },
});
