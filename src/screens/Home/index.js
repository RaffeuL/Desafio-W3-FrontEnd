import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Card from "../../globalComponents/Card";

import { useDispatch } from "react-redux";
import { getUserData, userLogout } from "../../services/userFeatures/auth";
import { logoutUser, setAccount } from "../../store/user";
import AccountInfo from "../../globalComponents/AccountInfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
    const dispach = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        const trigger = async () => {
            await getAccountData();
        };

        trigger();
    }, []);

    async function getAccountData() {
        const response = await getUserData();
        if (response.status == "sucess") {
            dispach(setAccount(response.data));
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
