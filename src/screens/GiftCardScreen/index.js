import React, { useState } from "react";
import { Text, View, StyleSheet, Alert, Keyboard } from "react-native";
import { Picker } from "@react-native-picker/picker";

import Input from "../../globalComponents/Input";
import Button from "../../globalComponents/Button";
import OptionsNavigation from "../../globalComponents/OptionsNavigation";

export default function GiftCardScreen() {
    const [agency, setAgency] = useState("");
    const [account, setAccount] = useState("");
    const [amount, setAmout] = useState("");
    const [stores, setStores] = useState([
        "Americanas",
        "Submarino",
        "Shoptime",
        "Extra",
        "Ponto Frio",
    ]);
    const [selectedStore, setSelectedStore] = useState("");
    const [errors, setErrors] = useState({});

    function handleError(errorMenssage, input) {
        setErrors((prevState) => ({ ...prevState, [input]: errorMenssage }));
    }

    function validate() {
        Keyboard.dismiss();
        let valid = true;
        const agencyRegex = /^[0-9]{1,4}$/g;
        const accountRegex = /^[0-9]{1,8}$/g;
        const amountRegex = /^[0-9]{1,}$/g;

        if (!agency) {
            handleError("Please input the agency", "agency");
            valid = false;
        } else if (!agencyRegex.test(agency)) {
            handleError(
                "Agency cannot contain letters and should have 4 digits",
                "agency"
            );
            valid = false;
        }

        if (!account) {
            handleError("Please input the account", "account");
            valid = false;
        } else if (!accountRegex.test(account)) {
            handleError(
                "Account Number cannot contain letters and should have 8 digits",
                "account"
            );
            valid = false;
        }

        if (!amount) {
            handleError("Please input the amount", "amount");
            valid = false;
        } else if (amount <= 0) {
            handleError("Amount cannot be negative or null", "amount");
            valid = false;
        } else if (!amountRegex.test(amount)) {
            handleError("Amount cannot contain letters or simbols", "amount");
            valid = false;
        }
        if (!selectedStore) {
            handleError("Please select a store", "store");
            valid = false;
        }
        if (valid) {
            transfer();
        }
    }

    function transfer() {
        if (agency === "1234" && account === "12345678") {
            Alert.alert(
                "Success",
                `Gift Card of $${amount} successfully purchased  in ${selectedStore} store`
            );
        } else {
            Alert.alert("Error", "Invalid credentials");
        }
    }

    return (
        <>
            <View style={styles.screen}>
                <Text style={styles.text}>Gift Card Screen</Text>
                <Input
                    placeholder={"Agency"}
                    onChangeText={setAgency}
                    keyboardType={"numeric"}
                    error={errors.agency}
                    onFocus={() => {
                        handleError(null, "agency");
                    }}
                />
                <Input
                    placeholder={"Account Number"}
                    onChangeText={setAccount}
                    keyboardType={"numeric"}
                    error={errors.account}
                    onFocus={() => {
                        handleError(null, "account");
                    }}
                />
                <Input
                    placeholder={"Amount"}
                    onChangeText={setAmout}
                    keyboardType={"numeric"}
                    error={errors.amount}
                    onFocus={() => {
                        handleError(null, "amount");
                    }}
                />
                <Picker
                    selectedValue={selectedStore}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedStore(itemValue)
                    }
                    style={styles.picker}
                    onFocus={() => {
                        handleError(null, "store");
                    }}
                >
                    <Picker.Item label={"Select a store"} value={null} />
                    {stores.map((store) => {
                        return (
                            <Picker.Item
                                label={store}
                                value={store}
                                key={store}
                            />
                        );
                    })}
                </Picker>
                {errors.store && (
                    <Text style={{ color: "red", alignSelf: "center" }}>
                        {errors.store}
                    </Text>
                )}
                <Button label={"Transfer"} onPress={validate} />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: "#232323",
        height: "100%",
        width: "100%",
        justifyContent: "center",
    },
    text: {
        color: "#FFB400",
        textAlign: "center",
    },
    picker: {
        marginTop: 10,
        backgroundColor: "#5e5d58",
        height: 50,
        width: "80%",
        alignSelf: "center",
        color: "#FFB400",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#FFB400",
    },
});
