import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Card from "../../globalComponents/Card";

import { useDispatch } from "react-redux";
import { getUserData, userLogout } from "../../services/userFeatures/auth";
import { logoutUser, setAccount } from "../../store/user";
import AccountInfo from "../../globalComponents/AccountInfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
    const dispach = useDispatch();
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function trigger() {
            await getAccountData();
        }

        trigger();
    }, []);

    async function getAccountData() {
        const response = await getUserData();
        if (response.status == "sucess") {
            dispach(setAccount(response.data));
            setIsLoading(false);
        }
    }

    async function logout() {
        const response = await userLogout();
        if (response == "sucess") {
            dispach(logoutUser());
            await AsyncStorage.clear();
            navigation.replace("LogIn");
        }
    }

    if (isLoading) {
        return (
            <View style={styles.screen}>
                <Text style={styles.text}>Loading...</Text>
            </View>
        );
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
    text: {
        color: "white",
    },
});
